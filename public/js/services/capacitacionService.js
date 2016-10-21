nutrifamiApp.factory('CapacitacionService', function() {
    var service = {};

    service.getLeccionesActivas = function(modulo) {

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
        unidades = this.getUnidadesActivas(leccion);
        return unidades[rp_unidad - 1];
    };
    return service;
});
