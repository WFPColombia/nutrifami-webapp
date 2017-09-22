nutrifamiApp.factory('UsuarioService', function() {
    var service = {};

    service.initClient = function() {
        //Se recarga toda la información en caso de que actualicen la pantalla con f5 o algo así

        var data = JSON.parse(localStorage.getItem('capacitacion'));

        nutrifami.training.cap_capacitacionesId = data['serv_capacitacionesId'];
        nutrifami.training.cap_capacitaciones = data['serv_capacitaciones'];
        nutrifami.training.cap_modulos = data['serv_modulos'];
        nutrifami.training.cap_lecciones = data['serv_lecciones'];
        nutrifami.training.cap_unidadesinformacion = data['serv_unidades'];
        nutrifami.training.cap_unidadestips = data["serv_tips"];

    }

    /**
     * 
     * @returns {Array|Object}
     * 
     * UsuarioService.getUsuarioActivo()
     *  
     */
    service.getUsuarioActivo = function() {
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
    service.setUsuarioActivo = function(usuario, callback) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        delete usuario["sesionId"];
        delete usuario["isLogin"];
        delete usuario["token"];
        nutrifami.editarUsuarioActivo(usuario, function(response) {
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
    service.getUsuarioAvance = function() {
        this.initClient();

        usuarioAvance = JSON.parse(localStorage.getItem('usuarioAvance'));
        if (typeof usuarioAvance.totalUnidades == 'undefined') {
            usuarioAvance.totalUnidades = Object.keys(nutrifami.training.cap_lecciones).length;
            localStorage.setItem("usuarioAvance", JSON.stringify(usuarioAvance));
        }


        usuarioAvance.medallas = 0;
        usuarioAvance.nivel = 0;
        usuarioAvance.leccion = 0;
        usuarioAvance.puntos = 0;
        usuarioAvance.porcentaje = 0;
        usuarioAvance.diplomas = [];
        var modulo = {};

        for (var i in usuarioAvance[3]) {
            usuarioAvance.medallas = usuarioAvance.medallas + Object.keys(usuarioAvance[3][i]).length;
            usuarioAvance.nivel = usuarioAvance.nivel + 1;
            usuarioAvance.leccion = Object.keys(usuarioAvance[3][i]).length;

            modulo = nutrifami.training.getModulo(i);

            if (Object.keys(usuarioAvance[3][i]).length == modulo.lecciones.length) {
                usuarioAvance.diplomas.push(modulo.titulo.texto);
            }

        }

        usuarioAvance.puntos = usuarioAvance.medallas * 100;

        usuarioAvance.porcentaje = parseInt((100 / usuarioAvance.totalUnidades) * usuarioAvance.medallas);





        return usuarioAvance;
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
    service.setUsuarioAvance = function(usuarioAvance, data, callback) {
        callback = callback || function() {};

        nutrifami.avance.addAvance(data, function(response) {
            if (response.success) {
                localStorage.setItem("usuarioAvance", JSON.stringify(usuarioAvance));
                callback(response);
            }
        });
    };


    service.getUsuarioFamiliaAvance = function() {
        return JSON.parse(localStorage.getItem('usuarioFamiliaAvance'));
    };

    /* 
     * 
     */
    service.getUsuarioFamilia = function() {

        var usuarioFamilia = JSON.parse(localStorage.getItem('usuarioFamilia'));
        var avanceFamilia = this.getUsuarioFamiliaAvance();

        for (var i in usuarioFamilia) {
            if (typeof avanceFamilia[usuarioFamilia[i]['FAM_PER_ID']] == 'undefined') {
                usuarioFamilia[i]['medallas'] = 0;

            } else {
                usuarioFamilia[i]['medallas'] = 0;
                for (var j in avanceFamilia[usuarioFamilia[i]['FAM_PER_ID']][3]) {
                    usuarioFamilia[i]['medallas'] = usuarioFamilia[i]['medallas'] + Object.keys(avanceFamilia[usuarioFamilia[i]['FAM_PER_ID']][3][j]).length;
                }


            }
        }

        return usuarioFamilia;
    };

    /* 
     * 
     */
    service.setUsuarioFamilia = function(usuarioFamilia) {
        localStorage.setItem("usuarioFamilia", JSON.stringify(usuarioFamilia));
    };





    return service;
});
