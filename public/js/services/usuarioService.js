nutrifamiApp.factory('UsuarioService', function () {
    var service = {};

    /**
     * 
     * @returns {Array|Object}
     * 
     * UsuarioService.getUsuarioActivo()
     *  
     */
    service.getUsuarioActivo = function () {
        return JSON.parse(localStorage.getItem('usuarioActivo'));
    };

    /**
     * 
     * @param {type} usuario
     * @param {type} callback
     * @returns {undefined}
     * 
     * UsuarioService.setUsuarioActivo(usuario, function(response)){}
     * 
     */
    service.setUsuarioActivo = function (usuario, callback) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        delete usuario["sesionId"];
        delete usuario["isLogin"];
        delete usuario["token"];
        nutrifami.editarUsuarioActivo(usuario, function (response) {
            callback(response);
        });

    };

    /**
     * 
     * @returns {Array|Object}
     * 
     * UsuarioService.getUsuarioAvance()
     * 
     */
    service.getUsuarioAvance = function () {
        return JSON.parse(localStorage.getItem('usuarioAvance'));
    };

    /**
     * 
     * @param {type} usuarioAvance
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     * 
     * UsuarioService.setUsuarioAvance(usuarioAvance, data, function(response)){}
     * 
     */
    service.setUsuarioAvance = function (usuarioAvance, data, callback) {
        callback = callback || function () {
        };

        nutrifami.avance.addAvance(data, function (response) {
            if (response.success) {
                localStorage.setItem("usuarioAvance", JSON.stringify(usuarioAvance));
                callback(response);
            }
        });
    };
    
    
    service.getUsuarioFamiliaAvance = function(){
        return JSON.parse(localStorage.getItem('usuarioFamiliaAvance'));
    };
    
    /* 
     * 
     */
    service.getUsuarioFamilia = function(){
        return JSON.parse(localStorage.getItem('usuarioFamilia'));
    };
    
    /* 
     * 
     */
    service.setUsuarioFamilia = function(usuarioFamilia){
        localStorage.setItem("usuarioFamilia", JSON.stringify(usuarioFamilia));
    };


    return service;
});
