/*global angular*/
nutrifamiApp.controller('nc_jugarResumenController', function($scope, $anchorScroll, $location, $uibModal, bsLoadingOverlayService, UsuarioService, NutricompraService) {
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
        'nombre': 'Cereales, raíces, tubérculos y plátanos.',
        'alias': 'cereal',
        'productos': ['5', '2'],
    }, {
        'grupo': 'grasas',
        'nombre': 'Grasas.',
        'productos': [],
    }, {
        'grupo': 'frutas',
        'nombre': 'Frutas y verduras.',
        'productos': [],
    }, {
        'grupo': 'azucares',
        'nombre': 'Azucar.',
        'productos': [],
    }, {
        'grupo': 'carnes',
        'nombre': 'Carnes, huevos y leguminosas secas.',
        'productos': [],
    }, {
        'grupo': 'inadecuados',
        'nombre': 'Inadecuados',
        'productos': [],
    }, {
        'grupo': 'lacteos',
        'nombre': 'Leches y otros productos lacteos.',
        'alias': 'leche',
        'productos': [1, 2, 3, 4],
    }, ]



});
