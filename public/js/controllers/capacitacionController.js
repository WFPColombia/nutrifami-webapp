/*global angular*/
nutrifamiApp.controller('CapacitacionController', function($scope, $anchorScroll, $location, bsLoadingOverlayService, UsuarioService, CapacitacionService) {
    'use strict';

    $anchorScroll();

    /* Overloading*/
    bsLoadingOverlayService.start();
    /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
    $scope.$on('$viewContentLoaded', function() {
        bsLoadingOverlayService.stop();
    });

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    $scope.usuarioAvance = UsuarioService.getUsuarioAvance();

    $scope.modulos = [];

    try {
        $scope.modulos = CapacitacionService.getModulosActivos(3);

    } catch (err) {
        console.log(err);
        $location.path('/capacitacion');
    }

});
