/*global angular*/
nutrifamiApp.controller('CapacitacionController', function ($scope, $anchorScroll, bsLoadingOverlayService, UsuarioService) {
    'use strict';

    $anchorScroll();

    /* Overloading*/
    bsLoadingOverlayService.start();
    /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
    $scope.$on('$viewContentLoaded', function () {
        bsLoadingOverlayService.stop();
    });
    
    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    $scope.avanceUsuario = UsuarioService.getUsuarioAvance();
    
    $scope.modulos = [];
    /* Obtenemos los ids de los modulos de la capacitación 3 */
    $scope.mids = nutrifami.training.getModulosId(3);
    /*Creamos un arreglo para poder recorerlo y mostrarlo a traves de directivas */
    for (var mid in $scope.mids) {
        var tempModulo = nutrifami.training.getModulo($scope.mids[mid]);
        tempModulo.avance = {};
        if (tempModulo.activo == '1') {
            tempModulo.activo = true;
        } else {
            tempModulo.activo = false;
        }

        if (typeof $scope.avanceUsuario['3'] !== 'undefined' && typeof $scope.avanceUsuario['3'][$scope.mids[mid]] !== 'undefined') {
            tempModulo.avance.leccionesFinalizadas = Object.keys($scope.avanceUsuario['3'][$scope.mids[mid]]).length;
        } else {
            tempModulo.avance.leccionesFinalizadas = 0;
        }
        $scope.modulos.push(tempModulo);
    }
    
    console.log($scope.modulos);
});