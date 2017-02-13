/*global angular*/
nutrifamiApp.controller('nc_jugarTerminarController', function($scope, $anchorScroll, $location, $uibModal, bsLoadingOverlayService, UsuarioService, NutricompraService) {
    'use strict';

    $anchorScroll();


    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    $scope.feedbacks = {}

    /* Overloading*/
    bsLoadingOverlayService.start();
    /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
    $scope.$on('$viewContentLoaded', function() {
        /* Se le agrega 0,3 segundos para poder verlo ver inicialmente
         * cuando el contenido se demore mucho en cargar se puede quitar el timeout*/
        bsLoadingOverlayService.stop();
    });

    NutricompraService.getFeedback(function(response) {

        $scope.feedbacks = response;
    });


    $scope.nutricompra = true;


    $scope.salir = function() {

        var data = {
            texto1: '¿Quiere jugar de Nuevo?',
            texto2: 'Podrá seguir practicando para hacer una compra saludable',
            boton1: 'Jugar',
            enlace1: 'nutricompra',
            boton2: 'Salir',
            enlace2: 'capacitacion'
        };

        var modalInstance = $uibModal.open({
            animation: true,
            windowClass: 'nutricompra-salir',
            templateUrl: 'views/nutricompra/nc_salir.modal.html',
            controller: 'nc_salirModalController',
            keyboard: false,
            size: 'sm',
            backdrop: 'static',
            resolve: {
                data: function() {
                    return data;
                }
            }

        });


    };

});
