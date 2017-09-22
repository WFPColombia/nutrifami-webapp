nutrifamiApp.factory('CapacitacionService', function(UsuarioService) {
    var service = {};

    service.initClient = function() {


        var data = JSON.parse(localStorage.getItem('capacitacion'));

        nutrifami.training.cap_capacitacionesId = data['serv_capacitacionesId'];
        nutrifami.training.cap_capacitaciones = data['serv_capacitaciones'];
        nutrifami.training.cap_modulos = data['serv_modulos'];
        nutrifami.training.cap_lecciones = data['serv_lecciones'];
        nutrifami.training.cap_unidadesinformacion = data['serv_unidades'];
        nutrifami.training.cap_unidadestips = data["serv_tips"];

    }


    service.getModulosActivos = function(capacitacion) {

        this.initClient();

        var modulos = []
        mids = nutrifami.training.getModulosId(capacitacion);
        var usuarioAvance = UsuarioService.getUsuarioAvance();
        for (var mid in mids) {
            var tempModulo = nutrifami.training.getModulo(mids[mid]);

            tempModulo.avance = {};
            tempModulo.avance.finalizado = false;
            //tempModulo.disponible = false;
            tempModulo.disponible = true;


            if (tempModulo.activo == '1') {
                tempModulo.activo = true;
            } else {
                tempModulo.activo = false;
            }

            if (typeof usuarioAvance['3'] !== 'undefined' && typeof usuarioAvance['3'][mids[mid]] !== 'undefined') {
                tempModulo.avance.leccionesFinalizadas = Object.keys(usuarioAvance['3'][mids[mid]]).length;
                if (this.getLeccionesActivas(tempModulo.id).length == tempModulo.avance.leccionesFinalizadas) {
                    tempModulo.avance.finalizado = true;
                }
            } else {
                tempModulo.avance.leccionesFinalizadas = 0;
            }

            modulos.push(tempModulo);

        }

        modulos[0].disponible = true;
        for (var i in modulos) {
            if (i != 0) {
                var temp = i - 1;
                if (modulos[i].avance.finalizado) {
                    modulos[i].disponible = true;
                } else if (modulos[i].avance.leccionesFinalizadas > 0) {
                    modulos[i].disponible = true;
                } else if (modulos[temp].avance.finalizado) {
                    modulos[i].disponible = true;
                }
            }


        }

        return modulos;

    };

    service.getModulo = function(modulo) {
        this.initClient();
        return nutrifami.training.getModulo(modulo);
    }

    service.getLeccionesActivas = function(modulo) {
        this.initClient();
        var lecciones = []
        lids = nutrifami.training.getLeccionesId(modulo);
        for (var lid in lids) {
            var tempLeccion = nutrifami.training.getLeccion(lids[lid]);

            if (tempLeccion.activo == 1) {
                lecciones.push(tempLeccion);
            }

        }

        return lecciones;

    };

    service.getUnidadesActivas = function(leccion) {
        this.initClient();
        var uids = nutrifami.training.getUnidadesId(leccion);
        var temp = [];
        for (var i in uids) {
            if (nutrifami.training.getUnidad(uids[i]).activo == 1) {
                temp.push(nutrifami.training.getUnidad(uids[i]));
            }
        }
        return temp;

    };

    service.getUnidad = function(leccion, rp_unidad) {
        this.initClient();
        unidades = this.getUnidadesActivas(leccion);
        return unidades[rp_unidad - 1];
    };
    return service;
});
