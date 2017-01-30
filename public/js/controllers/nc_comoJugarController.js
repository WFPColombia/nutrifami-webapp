/*global angular*/
nutrifamiApp.controller('nc_comoJugarController', function($scope, $anchorScroll, $location, $uibModal, bsLoadingOverlayService, UsuarioService) {
    'use strict';

    $anchorScroll();


    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();


    /* Overloading*/
    bsLoadingOverlayService.start();
    /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
    $scope.$on('$viewContentLoaded', function() {
        /* Se le agrega 0,3 segundos para poder verlo ver inicialmente
         * cuando el contenido se demore mucho en cargar se puede quitar el timeout*/
        bsLoadingOverlayService.stop();
    });

    $scope.nutricompra = true;



});
