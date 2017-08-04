var usuarioActivo = new Object(); /* Información del usuario logueado */
var usuarioAvance = new Object(); /* Información de avance del usuario*/
var usuarioFamilia = new Object(); /* Datos de la familia del usuario logueado, incluidos miembros de la familia*/
var usuarioFamiliaAvance = new Object(); /* Datos de avance de la familia*/



var base_url = 'http://www.nutrifami.org/';

var nutrifami = {
    /* nutrifami.usuarioActivoServerInfo */
    usuarioActivoServerInfo: new Object(),
    /*
     * nutrifami.getSessionId(callback);
     */
    getSessionId: function(callback) {
        callback = callback || function() {};
        var serv = base_url + "app/api/get-session-id";
        $.ajax({
            url: serv,
            async: false,
            success: function(data) {
                var objServ = JSON.parse(data);
                usuarioActivo.sesionId = objServ.sid;
                usuarioActivo.isLogin = usuarioActivo.isLogin || false;
                usuarioActivo.login_documento = usuarioActivo.login_documento || '';
                usuarioActivo.login_codigo = usuarioActivo.login_codigo || '';
                usuarioActivo.token = usuarioActivo.token || '';
                callback();
            }
        });
    },

    //Modificacion
    /*
     * nutrifami.buildToken(callback)
     */
    buildToken: function(callback) {
        callback = callback || function() {};
        if (usuarioActivo.sesionId && usuarioActivo.sesionId != '' && usuarioActivo.login_documento && usuarioActivo.login_documento != '' && usuarioActivo.login_codigo && usuarioActivo.login_codigo != '') {
            var tempSid = usuarioActivo.sesionId;
            var tempLdoc = usuarioActivo.login_documento;
            var tempLcod = usuarioActivo.login_codigo;
            var tokenTemp = tempSid.substring(0, 4) + tempLdoc.substring(0, 4) + tempSid.substring(4, 8) + tempLcod.substring(0, 4) + tempSid.substring(8, 12);
            var tokenTemp = md5(tokenTemp);
            usuarioActivo.token = tokenTemp;

        } else {
            usuarioActivo.token = '';
        }
        callback();
    },
    /*
     * nutrifami.setLoginData(documento, codigo, callback)
     */
    setLoginData: function(documento, codigo, callback) {
        documento = documento || '';
        codigo = codigo || '';
        callback = callback || function() {};
        if (documento != '' && codigo != '') {
            usuarioActivo.login_documento = documento;
            usuarioActivo.login_codigo = codigo;
            this.buildToken(function() {
                callback();
            });
        }
    },
    /*
     * nutrifami.login(callback);
     * 
     * @param {type} documento
     * @param {type} codigo
     * @param {type} callback
     * @returns {undefined}
     */
    login: function(callback) {
        callback = callback || function() {};
        var serv = base_url + "app/api/login?d=" + usuarioActivo.login_documento + "&c=" + usuarioActivo.login_codigo + "&t=" + usuarioActivo.token;
        response = {
            success: false,
            message: ''
        };
        $.ajax({
            url: serv,
            type: 'POST',
            async: true,
            success: function(data) {
                var objServ = JSON.parse(data);
                if (objServ.response === 1) {

                    /* Combinamos la información de usuarioActivo existente con la nueva */
                    $.extend(usuarioActivo, objServ);
                    usuarioActivo.narrador = true;

                    /* Se copia la información de avance en un objeto independiente y se elimina la información de usuarioActivo*/
                    usuarioAvance = usuarioActivo.avance[usuarioActivo.id];

                    /* Se copia la informaciòn de avance de familia a un objeto independiente*/
                    usuarioFamiliaAvance = usuarioActivo.avance;
                    delete usuarioActivo["avance"];
                    delete usuarioFamiliaAvance[usuarioActivo.id];

                    /*Se copia información de familia de usuario Activo en objeto independiente*/
                    usuarioFamilia = usuarioActivo.familia;
                    delete usuarioActivo["familia"];

                    /* Se almacena usuario activo en el locaStorage para llamarlo más facilmente */
                    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
                    localStorage.setItem("usuarioAvance", JSON.stringify(usuarioAvance));
                    localStorage.setItem("usuarioFamiliaAvance", JSON.stringify(usuarioFamiliaAvance));
                    localStorage.setItem("usuarioFamilia", JSON.stringify(usuarioFamilia));

                    this.isloginFlag = true;
                    response.success = true;
                    response.message = usuarioActivo.token;

                } else {
                    response.success = false;
                    response.message = 'Documento o Código incorrecto';
                }
                callback(response);
            },
            error: function() {
                response.success = false;
                response.message = 'Ha ocurrido un error durante la ejecución';
                callback(response);
            }
        });
    },
    /*
     * nutrifami.editarUsuarioActivo(data, callback);
     * @param {type} data
     * @param {type} callback
     */
    editarUsuarioActivo: function(data, callback) {
        callback = callback || function() {};
        //  app/api/editar-usuario?t='token'
        var serv = base_url + "app/api/editar-usuario";
        response = {
            success: false,
            message: ''
        };
        $.ajax({
            url: serv,
            type: 'GET',
            async: true,
            data: data,
            success: function(data) {
                var objServ = JSON.parse(data);
                if (objServ.response === 1) {
                    response.success = true;
                    response.message = 'El usuario se ha actualizado con éxito';
                } else {
                    response.success = false;
                    response.message = 'Los datos son errados';
                }
                callback(response);
            },
            error: function() {
                response.success = true;
                response.message = 'Ha ocurrido un error durante la ejecución';
                callback(response);
            }
        });


    },
    /*
     * nutrifami.editarUsuarioActivo(data, callback);
     * @param {type} data
     * @param {type} callback
     */
    agregarFamiliar: function(data, callback) {
        callback = callback || function() {};
        //  app/api/agregar-familar?t='token'
        var serv = base_url + "app/api/agregar-familiar";
        response = {
            success: false,
            message: ''
        };
        $.ajax({
            url: serv,
            type: 'GET',
            async: true,
            data: data,
            success: function(data) {
                var objServ = JSON.parse(data);
                response = objServ.response;
                callback(response);
            },
            error: function() {
                response.success = true;
                response.message = 'Ha ocurrido un error durante la ejecución';
                callback(response);
            }
        });


    },

    agregarUsuario: function(data, callback) {
        callback = callback || function() {};
        var serv = base_url + "app/api/agregar-usuario";
        response = {
            success: false,
            message: ''
        };
        $.ajax({
            url: serv,
            type: 'GET',
            async: true,
            data: data,
            success: function(data) {
                var objServ = JSON.parse(data);
                response = objServ.response;
                callback(response);
            },
            error: function() {
                response.success = true;
                response.message = 'Ha ocurrido un error durante la ejecución';
                callback(response);
            }
        });


    },
    /*
     * nutrifami.subirUsuarioActivo(callback);
     */
    subirUsuarioActivo: function(callback) {
        callback = callback || function() {};
        console.log('subirUsuarioActivo');
        /*
         * Funcionalidad Ajax
         */
    },
    /*
     * nutrifami.islogin(callback);
     */
    islogin: function(callback) {
        callback = callback || function() {};
        return this.isloginFlag;
    },
    /*
     * Sub elemento training
     * 
     * Manejo de todas las funcionalidades de las capacitaciones
     * 
     */
    training: {
        cap_capacitacionesId: new Array(),
        cap_capacitaciones: new Object(),
        /* this.cap_capacitacion */
        cap_modulos: new Object(),
        /* this.cap_modulos */
        cap_lecciones: new Object(),
        /* this.cap_lecciones */
        cap_unidadesinformacion: new Object(),
        /* this.cap_unidadesinformacion */
        cap_loadContentProgress: false,
        /* this.cap_loadContentProgress */

        /*
         *  nutrifami.training.initClient(callback);
         *  
         *  Inicializa los objetos necesarios en la estructura de la capacitacion.
         *  
         */
        initClient: function(capacitacion, callback) {
            callback = callback || function() {};
            capacitacion = capacitacion || '';

            if (window.cordova) {
                nutrifami.training.cap_capacitacionesId = capacitacion["serv_capacitacionesId"];
                nutrifami.training.cap_capacitaciones = capacitacion["serv_capacitaciones"];
                nutrifami.training.cap_modulos = capacitacion["serv_modulos"];
                nutrifami.training.cap_lecciones = capacitacion["serv_lecciones"];
                nutrifami.training.cap_unidadesinformacion = capacitacion["serv_unidades"];
                nutrifami.training.cap_unidadestips = capacitacion["serv_tips"];
                callback();
            } else {
                var ran = Math.floor((Math.random() * 100) + 1);


                $.getJSON("js/capacitacion.JSON?" + ran, function(data) {
                    localStorage.setItem("capacitacion", JSON.stringify(data));
                    nutrifami.training.cap_capacitacionesId = data['serv_capacitacionesId'];
                    nutrifami.training.cap_capacitaciones = data['serv_capacitaciones'];
                    nutrifami.training.cap_modulos = data['serv_modulos'];
                    nutrifami.training.cap_lecciones = data['serv_lecciones'];
                    nutrifami.training.cap_unidadesinformacion = data['serv_unidades'];
                    nutrifami.training.cap_unidadestips = data["serv_tips"];
                    callback();
                }).fail(function(jqxhr, textStatus, error) {
                    
                    var err = textStatus + ", " + error;
                });
            }
        },
        /*
         * nutrifami.training.downloadCapacitacion(cid, callback);
         */
        downloadCapacitacion: function(cid, callback) {
            cid = cid || 0;
            callback = callback || function() {};

            var serv = base_url + "app/api/get-capacitaciones?cid=" + cid;
            $.ajax({
                url: serv,
                async: false,
                success: function(data) {
                    var objServ = JSON.parse(data);
                    /*var capacitacionObj = {
                     id: 3,
                     tipo: {
                     id: 1,
                     alias: 'general',
                     nombre: 'General',
                     descripcion: 'Capacitación para el publico en general'
                     },
                     titulo: 'Participantes PMA',
                     descripcion: 'Capacitacion inicial, para participantes del PMA',
                     fecha: '', 
                     activo: true, 
                     modulos: {  
                     1: 5
                     }, 
                     completo: false
                     };*/
                    $.each(objServ, function(index, value) {
                        var capObj = value;
                        capObj.completo = false;
                        nutrifami.training.cap_capacitaciones[index] = nutrifami.training.cap_capacitaciones[index] || capObj;
                        nutrifami.training.cap_capacitacionesId.push(nutrifami.training.cap_capacitaciones[index].id);
                    });
                    callback();
                }
            });
            /* Si this.cap_capacitaciones[3] existe y 
             * this.cap_capacitaciones[3].fecha es igual a la del servidor
             * No se debe cargar la info de esa capacitacion. 
             * 
             * Si cid > 0 se trae la info solo de esa capacitacion,
             * sino se trae la de todas las capacitaciones activas            
             * 
             * Eliminar todos los elementos que no existan en el servidor
             * al terminar la carga                       
             */
            /* Fin Ajax */
        },
        /*
         * nutrifami.training.downloadModulo(mid, callback);
         */
        downloadModulo: function(mid, callback) {
            mid = mid || 0;
            callback = callback || function() {};

            var serv = base_url + "app/api/get-modulo?mid=" + mid;
            $.ajax({
                url: serv,
                async: false,
                success: function(data) {
                    var objServ = JSON.parse(data);
                    /*var moduloObj = {
                     id: 5,
                     titulo: 'Alimentación Saludable y Agua Sana',
                     descripcion: 'Alimentación Saludable y Agua Sana',
                     imagen: {
                     nombre: '201651175223151.jpg',
                     content: Object, // Cargar con otra funcion 
                     loaded: false
                     },
                     fecha: '', 
                     activo: true, 
                     lecciones: {  
                     01: 16,
                     02: 17,
                     03: 18,
                     04: 19,
                     05: 20
                     }, 
                     completo: false
                     } ;*/
                    objServ.completo = false;
                    if (typeof nutrifami.training.cap_modulos[objServ.id] === 'undefined' || nutrifami.training.cap_modulos[objServ.id] === null) {
                        nutrifami.training.cap_modulos[objServ.id] = objServ;
                        if (typeof nutrifami.training.cap_modulos[objServ.id].imagen !== 'undefined') { /* Cargar imgagen desde s3*/
                            nutrifami_aws.s3.downloadFile(objServ.imagen.nombre, nutrifami.training.cap_modulos[objServ.id].imagen, 'content', 'loaded');
                        }
                        callback();
                    } else {
                        callback();
                    }
                }
            });
            /* Fin Ajax */
        },
        /*
         * nutrifami.training.downloadLeccion(lid, callback);
         */
        downloadLeccion: function(lid, callback) {
            lid = lid || 0;
            callback = callback || function() {};

            /* Ajax */
            var serv = base_url + "app/api/get-leccion?lid=" + lid;
            $.ajax({
                url: serv,
                async: false,
                success: function(data) {
                    var objServ = JSON.parse(data);
                    /*var leccionObj = {
                     id: 16,
                     titulo: 'Alimentación saludable',
                     descripcion: 'Alimentación saludable',
                     imagen: {
                     nombre: '201651175223151.jpg',
                     content: Object, 
                     loaded: false
                     },
                     fecha: '', 
                     activo: true, 
                     unidades: {  
                     0100: 1,
                     0200: 2,
                     0300: 3,
                     0301: 6,
                     0400: 4,
                     0500: 5
                     }, 
                     completo: false
                     } ;
                     this.cap_lecciones[16] = leccionObj; 
                     */
                    objServ.completo = false;
                    if (typeof nutrifami.training.cap_lecciones[objServ.id] === 'undefined' || nutrifami.training.cap_lecciones[objServ.id] === null) {
                        nutrifami.training.cap_lecciones[objServ.id] = objServ;
                        if (typeof nutrifami.training.cap_lecciones[objServ.id].imagen !== 'undefined') { /* Cargar imgagen desde s3*/
                            nutrifami_aws.s3.downloadFile(objServ.imagen.nombre, nutrifami.training.cap_lecciones[objServ.id].imagen, 'content', 'loaded');
                        }
                        callback();
                        /* Cargar imgagen desde s3*/
                    } else {
                        callback();
                    }
                }
            });
            /* Fin Ajax */
        },
        /*
         * nutrifami.training.downloadUnidad(uid, callback);
         */
        downloadUnidad: function(uid, callback) {
            uid = uid || 0;
            callback = callback || function() {};

            /* Ajax */
            var serv = base_url + "app/api/get-unidadinformacion?uid=" + uid;
            $.ajax({
                url: serv,
                async: false,
                success: function(data) {
                    var objServ = JSON.parse(data);
                    /*
                     var unidadObj = {
                     id: 3,
                     tipo: {
                     id: 3,
                     nombre: 'Quiz imagen',
                     alias: 'tipo3', 
                     descripcion: 'Seleccionar una opcion, entre 6, de acuerdo a la pregunta y a la imagen que se muestra.'
                     },
                     titulo: 'Lorem ipsum dolor sit amet',
                     instruccion: 'Lorem ipsum dolor sit amet',
                     audio: {
                     nombre: '194813__unfa__hello-nerds-inspired-by-animaniacs-hello-nurse-6-takes.flac',
                     content: Object, 
                     loaded: false
                     },
                     texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ante a lorem laoreet facilisis.',
                     imagen: {
                     nombre: '201651175223151.jpg',
                     content: Object, 
                     loaded: false
                     },
                     media: {
                     nombre: '',
                     content: Object, 
                     loaded: false
                     },
                     fecha: '', 
                     activo: true, 
                     from: 0, 
                     opciones: {  
                     9: {
                     id: 9,
                     correcta: false,
                     orden: 0,
                     fecha: '',
                     visible: true,
                     texto: 'Nam',
                     audio: {
                     nombre: '',
                     content: Object, 
                     loaded: false
                     },
                     media: {
                     nombre: '',
                     content: Object,
                     loaded: false
                     }
                     }
                     }, 
                     completo: false
                     } ; 
                     */
                    objServ.completo = false;
                    if (typeof nutrifami.training.cap_unidadesinformacion[objServ.id] === 'undefined' || nutrifami.training.cap_unidadesinformacion[objServ.id] === null) {
                        nutrifami.training.cap_unidadesinformacion[objServ.id] = objServ;
                        if (typeof nutrifami.training.cap_unidadesinformacion[objServ.id].imagen !== 'undefined') {
                            nutrifami_aws.s3.downloadFile(objServ.imagen.nombre, nutrifami.training.cap_unidadesinformacion[objServ.id].imagen, 'content', 'loaded');
                        }
                        if (typeof nutrifami.training.cap_unidadesinformacion[objServ.id].audio !== 'undefined') {
                            nutrifami_aws.s3.downloadFile(objServ.audio.nombre, nutrifami.training.cap_unidadesinformacion[objServ.id].audio, 'content', 'loaded');
                        }
                        if (typeof nutrifami.training.cap_unidadesinformacion[objServ.id].media !== 'undefined') {
                            nutrifami_aws.s3.downloadFile(objServ.media.nombre, nutrifami.training.cap_unidadesinformacion[objServ.id].media, 'content', 'loaded');
                        }
                        $.each(nutrifami.training.cap_unidadesinformacion[objServ.id].opciones, function(indexopc, opcionun) {
                            if (typeof nutrifami.training.cap_unidadesinformacion[objServ.id].opciones[opcionun.id].audio !== 'undefined') {
                                nutrifami_aws.s3.downloadFile(opcionun.audio.nombre, nutrifami.training.cap_unidadesinformacion[objServ.id].opciones[opcionun.id].audio, 'content', 'loaded');
                            }
                            if (typeof nutrifami.training.cap_unidadesinformacion[objServ.id].opciones[opcionun.id].media !== 'undefined') {
                                nutrifami_aws.s3.downloadFile(opcionun.media.nombre, nutrifami.training.cap_unidadesinformacion[objServ.id].opciones[opcionun.id].media, 'content', 'loaded');
                            }
                        });
                        callback();
                    } else {
                        callback();
                    }
                }
            });
            /* Fin Ajax */
        },
        /*
         * nutrifami.training.loadCapacitacion(callback);
         */
        loadCapacitacion: function(callback) {
            callback();
            /*
             callback = callback || function() {};
             nutrifami.training.downloadCapacitacion(0, function(){
             $.each(nutrifami.training.cap_capacitaciones, function(indexcap, capacitaciones) {
             $.each(capacitaciones.modulos, function(indexmod, id_modulo) {
             nutrifami.training.downloadModulo(id_modulo, function(){
             callback();
             });
             }); 
             }); 
             });
             */
        },
        /*
         * nutrifami.training.loadModulo(mid, all, callback);
         */
        loadModulo: function(mid, all, callback) {
            mid = mid || 0;
            all = all || false;
            callback = callback || function() {};
            callback();
            /*
             if ( all ) {
             $.each(nutrifami.training.cap_modulos[mid].lecciones, function(indexlec, id_leccion) {
             nutrifami.training.downloadLeccion(id_leccion, function(){
             if (nutrifami.training.cap_lecciones[id_leccion].unidades) {
             $.each(nutrifami.training.cap_lecciones[id_leccion].unidades, function(indexuni, id_unidad) {
             nutrifami.training.downloadUnidad(id_unidad, function(){
             console.log('Carga unidad '+id_unidad);
             });
             }); 
             }
             });
             }); 
             callback();
             }else {
             $.each(nutrifami.training.cap_modulos[mid].lecciones, function(indexlec, id_leccion) {
             nutrifami.training.downloadLeccion(id_leccion, function(){
             console.log('Carga leccion '+id_leccion);
             });
             }); 
             callback();
             }*/
        },
        /*
         * nutrifami.training.loadLeccion(lid, callback);
         */
        loadLeccion: function(lid, callback) {
            lid = lid || 0;
            callback = callback || function() {};
            callback();
            /*
             $.each(nutrifami.training.cap_lecciones[lid].unidades, function(indexuni, id_unidad) {
             nutrifami.training.downloadUnidad(id_unidad, function(){
             console.log('Carga unidad '+id_unidad);
             });
             }); 
             callback();
             */
        },
        /*
         * nutrifami.training.getCapacitacionesId();
         */
        getCapacitacionesId: function() {
            if (typeof nutrifami.training.cap_capacitacionesId !== 'undefined') {
                return nutrifami.training.cap_capacitacionesId;
            } else {
                return false;
            }
        },
        /*
         * nutrifami.training.getCapacitacion(cid);
         */
        getCapacitacion: function(cid) {
            cid = cid || 3;
            if (typeof nutrifami.training.cap_capacitaciones[cid] !== 'undefined') {
                return nutrifami.training.cap_capacitaciones[cid];
            } else {
                return false;
            }
        },
        /*
         * nutrifami.training.getModulosId(cid);
         */
        getModulosId: function(cid) {
            cid = cid || 3;
            if (typeof nutrifami.training.cap_capacitaciones[cid].modulos !== 'undefined') {
                return nutrifami.training.cap_capacitaciones[cid].modulos;
            } else {
                return false;
            }
        },
        /*
         * nutrifami.training.getModulo(mid);
         */
        getModulo: function(mid) {
            if (typeof nutrifami.training.cap_modulos[mid] !== 'undefined') {
                return nutrifami.training.cap_modulos[mid];
            } else {
                return false;
            }
        },
        /*
         * nutrifami.training.getLeccionesId(mid);
         */
        getLeccionesId: function(mid) {
            if (typeof nutrifami.training.cap_modulos[mid].lecciones !== 'undefined') {
                return nutrifami.training.cap_modulos[mid].lecciones;
            } else {
                return false;
            }
        },
        /*
         * nutrifami.training.getLeccion(lid);
         */
        getLeccion: function(lid) {
            if (typeof nutrifami.training.cap_lecciones[lid] !== 'undefined') {
                return nutrifami.training.cap_lecciones[lid];
            } else {
                return false;
            }
        },
        /*
         * nutrifami.training.getUnidadesId(lid);
         */
        getUnidadesId: function(lid) {
            if (typeof nutrifami.training.cap_lecciones[lid].unidades !== 'undefined') {
                return nutrifami.training.cap_lecciones[lid].unidades;
            } else {
                return false;
            }
        },
        /*
         * nutrifami.training.getUnidad(uid);
         */
        getUnidad: function(uid) {
            if (typeof nutrifami.training.cap_unidadesinformacion[uid] !== 'undefined') {
                return nutrifami.training.cap_unidadesinformacion[uid];
            } else {
                return false;
            }
        },
        /*
         * nutrifami.training.getUnidad(uid);
         */
        getTips: function() {
            if (typeof nutrifami.training.cap_unidadestips !== 'undefined') {
                return nutrifami.training.cap_unidadestips;
            } else {
                return false;
            }
        }

    },
    avance: {
        /*
         * nutrifami.avance.addAvance(data, callback);
         */
        addAvance: function(data, callback) {
            callback = callback || function() {};
            var serv = base_url + "app/api/add-avance";
            response = {
                success: false,
                message: ''
            };
            $.ajax({
                url: serv,
                type: 'GET',
                async: true,
                data: data,
                success: function(data) {
                    var objServ = JSON.parse(data);
                    response = objServ.response;
                    callback(response);
                },
                error: function() {
                    response.success = true;
                    response.message = 'Ha ocurrido un error durante la ejecución';
                    callback(response);
                }
            });

        }
    },
    consumo: {
        /*
         * nutrifami.consumo.getConsolidadoCompras(data, callback);
         */
        getConsolidadoCompras: function(data, callback) {
            callback = callback || function() {};
            var serv = base_url + "app/api/get-consolidado-compras";
            response = {
                success: false,
                message: ''
            };
            $.ajax({
                url: serv,
                type: 'GET',
                async: true,
                data: data,
                success: function(data) {
                    var objServ = JSON.parse(data);
                    response.success = true;
                    response.data = objServ;
                    callback(response);
                },
                error: function() {
                    response.success = false;
                    response.message = 'Ha ocurrido un error durante la ejecución';
                    callback(response);
                }
            });

        },
        /*
         * nutrifami.consumo.getProductosPuntoVenta(data, callback);
         */
        getProductosPuntoVenta: function(data, callback) {
            callback = callback || function() {};
            var serv = base_url + "app/api/get-productos-puntoventa";
            response = {
                success: false,
                message: ''
            };
            $.ajax({
                url: serv,
                type: 'GET',
                async: true,
                data: data,
                success: function(data) {
                    var objServ = JSON.parse(data);
                    response.success = true;
                    response.data = objServ;
                    callback(response);
                },
                error: function() {
                    response.success = false;
                    response.message = 'Ha ocurrido un error durante la ejecución';
                    callback(response);
                }
            });

        }
    }

};
