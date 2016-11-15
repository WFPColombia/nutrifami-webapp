/*global angular*/
nutrifamiApp.controller('ModuloController', function($scope, $location, $routeParams, $anchorScroll, bsLoadingOverlayService, UsuarioService) {
    'use strict';

    $anchorScroll();

    /* Overloading*/
    bsLoadingOverlayService.start();
    /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
    $scope.$on('$viewContentLoaded', function() {

        bsLoadingOverlayService.stop();
    });

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    $scope.avanceUsuario = UsuarioService.getUsuarioAvance();

    $scope.lecciones = [];


    /* Se hace un try por si el usuario intenta ingresar a la URL a otro modulo que lo  lleve al home */
    try {
        $scope.modulo = nutrifami.training.getModulo($routeParams.modulo);
        $scope.modulo.totalLecciones = 0;

        $scope.lids = nutrifami.training.getLeccionesId($routeParams.modulo);
        for (var lid in $scope.lids) {
            var tempLeccion = nutrifami.training.getLeccion($scope.lids[lid]);

            if (tempLeccion.activo == 1) {
                tempLeccion.avance = {};
                if (typeof $scope.avanceUsuario['3'] !== 'undefined' && typeof $scope.avanceUsuario['3'][$routeParams.modulo] !== 'undefined' && typeof $scope.avanceUsuario['3'][$routeParams.modulo][$scope.lids[lid]] !== 'undefined') {
                    tempLeccion.avance.terminada = true;
                } else {
                    tempLeccion.avance.terminada = false;
                }
                $scope.modulo.totalLecciones++;
                $scope.lecciones.push(tempLeccion);
            }

        }

        if (typeof $scope.avanceUsuario['3'] !== 'undefined' && typeof $scope.avanceUsuario['3'][$routeParams.modulo] !== 'undefined') {
            $scope.modulo.leccionesFinalizadas = Object.keys($scope.avanceUsuario['3'][$routeParams.modulo]).length;
        } else {
            $scope.modulo.leccionesFinalizadas = 0;
        }
    } catch (err) {
        $location.path('/capacitacion');
    }


    $scope.porcentajeAvance = function() {
        return (100 / $scope.modulo.totalLecciones * $scope.modulo.leccionesFinalizadas);
    };
    $scope.irALeccion = function(index) {
        $location.path('/m/' + $routeParams.modulo + "/" + $scope.lids[index] + "/1");
    };
});
