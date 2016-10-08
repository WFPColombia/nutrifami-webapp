/*global angular*/
nutrifamiApp.controller('ModuloController', function ($scope, $location, $routeParams, $anchorScroll, bsLoadingOverlayService, UsuarioService) {
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
    $scope.lecciones = [];

    /* Se hace un try por si el usuario intenta ingresar a la URL a otro modulo que lo lleve al home */
    try {
        $scope.modulo = nutrifami.training.getModulo($routeParams.modulo);
        $scope.modulo.totalLecciones = Object.keys($scope.modulo.lecciones).length;
        if (typeof $scope.avanceUsuario['3'] !== 'undefined' && typeof $scope.avanceUsuario['3'][$routeParams.modulo] !== 'undefined') {
            $scope.modulo.leccionesFinalizadas = Object.keys($scope.avanceUsuario['3'][$routeParams.modulo]).length;
        } else {
            $scope.modulo.leccionesFinalizadas = 0;
        }

        $scope.lids = nutrifami.training.getLeccionesId($routeParams.modulo);
        console.log($scope.lids);
        for (var lid in $scope.lids) {
            var tempLecciones = nutrifami.training.getLeccion($scope.lids[lid]);
            tempLecciones.avance = {};
            if (typeof $scope.avanceUsuario['3'] !== 'undefined' && typeof $scope.avanceUsuario['3'][$routeParams.modulo] !== 'undefined' && typeof $scope.avanceUsuario['3'][$routeParams.modulo][$scope.lids[lid]] !== 'undefined') {
                tempLecciones.avance.terminada = true;
            }
            else {
                tempLecciones.avance.terminada = false;
            }
            $scope.lecciones.push(tempLecciones);
        }
    } catch (err) {
        console.log(err);
        //$location.path('/');
    }

    console.log($scope.lecciones);
    console.log($scope.modulo);

    $scope.porcentajeAvance = function () {
        return(100 / $scope.modulo.totalLecciones * $scope.modulo.leccionesFinalizadas);
    };
    $scope.irALeccion = function (index) {
        $location.path('/m/' + $routeParams.modulo + "/" + $scope.lids[index] + "/1");
    };
});