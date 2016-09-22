/*global angular*/
nutrifamiApp.controller('LandingController', ['$scope', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', function ($scope, $anchorScroll, bsLoadingOverlayService, $timeout) {
        'use strict';

        $anchorScroll();

        /* Overloading*/
        bsLoadingOverlayService.start();
        /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
        $scope.$on('$viewContentLoaded', function () {
            /* Se le agrega 0,3 segundos para poder verlo ver inicialmente
             * cuando el contenido se demore mucho en cargar se puede quitar el timeout*/
                bsLoadingOverlayService.stop();
        });
        
    }]);
