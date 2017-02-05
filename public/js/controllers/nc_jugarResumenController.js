/*global angular*/
nutrifamiApp.controller('nc_jugarResumenController', function($scope, $anchorScroll, $location, $uibModal, bsLoadingOverlayService, UsuarioService, NutrijuegoService) {
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

    var categorias = [
        'azucares', 'carnes', 'cereal', 'frutas', 'grasas', 'inadecuados', 'leche'

    ];

    $scope.productos = [];

    $scope.carrito = [{
        'grupo': 'cereales',
        'nombre': 'Cereales',
        'productos': [],
        'active': false,
    }, {
        'grupo': 'grasas',
        'nombre': 'Cereales',
        'productos': [],
        'active': false,
    }, {
        'grupo': 'frutas',
        'nombre': 'Cereales',
        'productos': [],
        'active': false,
    }, {
        'grupo': 'azucares',
        'nombre': 'Cereales',
        'productos': [],
        'active': false,
    }, {
        'grupo': 'carnes',
        'nombre': 'Cereales',
        'productos': [],
        'active': false,
    }, {
        'grupo': 'inadecuados',
        'nombre': 'Cereales',
        'productos': [],
        'active': false,
    }, {
        'grupo': 'lacteos',
        'nombre': 'Cereales',
        'productos': [],
        'active': false,
    }, ]



});
