/**********************************************************
*
* Requiere incluir el API https://sdk.amazonaws.com/js/aws-sdk-2.3.15.min.js
* antes de incluir este archivo en su sitio WEB.
*
* @version 1
* @author {Abel Oswaldo Moreno Acevedo} <{moreno.abel@gmail.com}>
**********************************************************/

/*
 * Objeto con los datos de configuración inicial
 */
AWS_credentials = {
      userName: 'developer'
    , accessKeyId: 'AKIAIFBZYG6G44KXUE4A'
    , secretAccessKey: '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'
    , region: 'us-east-1' 
    , defaultBucket: 'nutrifami'    /* Nombre por defecto del bucket en S3 AWS */
};

/*
 * Bucket en S3
 */
var nutrifamiS3;

/*
 * Objeto para manejar funcionalidades de AWS
 * Directo al API
 */
nutrifami_aws = {
    
    /*
     * nutrifami_aws.s3.xxxxxxxxxx
     * Objeto que maneja las funcionalidades de S3
     */
    s3: {
        
        /*
         * nutrifami_aws.s3.load();
         * Carga la información inicial para gestionar S3
         * Parametros opcionales bucket, callback
         */
        load: function(callback){
            callback = callback || function(){};
            AWS.config.update({accessKeyId: AWS_credentials.accessKeyId, secretAccessKey: AWS_credentials.secretAccessKey});
            // Configure your region
            AWS.config.region = AWS_credentials.region;
            nutrifamiS3 = new AWS.S3({params: {Bucket: AWS_credentials.defaultBucket}});   /* Inicializa el bucket */
            callback();
        },
        
        /*
         * nutrifami_aws.s3.uploadFile(file);
         * Carga de archivo en s3
         * @param {file} file   // Objeto de archivo cargado con archivo
         * @param {string} folder   // Ubicacion en el bucket
         * @param {string} newName   
         * @param {function} callback   
         * @returns {String}
         */
        uploadFile: function(file, folder, newName, callback){
            callback = callback || function(){};
            folder = folder || '';
            var msj = 'error_1'; /* No se ejecuto la carga */
            if (file) {
              msj = 'success';
              var fileName = newName || file.name; 
              var params = {Key: folder+fileName, ContentType: file.type, Body: file, Bucket:AWS_credentials.defaultBucket, ACL:'public-read'};
              nutrifamiS3.upload(params, function (err, data) {
                  msj = 'error_2'; /* Excepcion en la carga a AWS */
                  if ( err == null ){
                      callback();
                  }else {
                      return err;  
                  }           
              });
            } else {
                msj = 'error_3';  /* No hay archivo que cargar*/
                return msj;  
            }
        },
        
        /*
         * nutrifami_aws.s3.changeBucket(bucket);
         * Cambia el bucket
         */
        changeBucket: function(bucket, callback) {
            bucket = bucket || AWS_credentials.defaultBucket;
            callback = callback || function(){};
            AWS_credentials.defaultBucket = bucket;
        },
        
        /*
         * nutrifami_aws.s3.downloadFile(file, callback);
         * @param {type} file
         * @param {type} callback
         * @returns {undefined}
         */
        downloadFile: function(file, vGlobal, indexGlobal, flagGlobal, callback){
            callback = callback || function(){};
            var params = {Key: file, Bucket:AWS_credentials.defaultBucket};
            vGlobal[flagGlobal] = 'loading';
            nutrifamiS3.getObject(params, function (err, data) {
                msj = 'error_2'; /* Excepcion en la carga a AWS */
                if ( err == null ){
                    vGlobal[indexGlobal] = encode(data.Body);
                    vGlobal[flagGlobal] = 'loaded';
                    vGlobal.ContentType = data.ContentType;
                    console.log(data.ContentType+' id: '+indexGlobal); /* Log, borrar. */
                    callback();
                }else {
                    vGlobal[flagGlobal] = 'empty';
                    return err;  
                }           
            });
        }
        
    }
    
};




function getExt (fileName){
    var s  = fileName,
    lw = s.replace(/^.+[\W]/, '');
    return lw;
}

function getFileName(fileName){
    var d = new Date();
    var sName = d.getFullYear()+''+d.getMonth()+''+d.getDay()+''+d.getHours()+''+d.getMinutes()+''+d.getSeconds()+''+d.getMilliseconds();
    return sName+'.'+getExt(fileName);
}

function encode(data)
{
    var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
}