/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
    
    nutrifami_aws.s3.load(function(){
        nutrifami.training.downloadCapacitacion(0, function(){
            nutrifami.training.downloadModulo(5, function(){
                $('#imagenS3').html('<img width="600" src="data:image/png;base64,'+nutrifami.training.cap_modulos[5].imagen.content+'">');
            });
        });
    });
    

    
    
});


