nutrifamiApp.controller('misComprasGrupoController', function($scope, $timeout, $location, $uibModal, ComprasService, ngAudio, bsLoadingOverlayService, UsuarioService) {
    'use strict';

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo()
    $scope.compras = true;


    $scope.audio1 = ngAudio.load("audios/compras-intro.mp3");
    $scope.audio2 = ngAudio.load("audios/compras-dieta-variada.mp3");
    $scope.gruposAlimenticios = [];


    var usuario = {};
    var puntoVenta = {
        'pid': 0
    };

    $scope.consumoUltimoMes = [{
        'nombre': "Cereales, raíces, tubérculos y plátanos.",
        'porcentaje_compra': 0,
    }, {
        'nombre': "Carnes, huevos y leguminosas secas.",
        'porcentaje_compra': 0

    }, {
        'nombre': "Leches y otros productos lácteos.",
        'porcentaje_compra': 0
    }, {
        'nombre': "Frutas y verduras.",
        'porcentaje_compra': 0
    }, {
        'nombre': "Grasas.",
        'porcentaje_compra': 0
    }, {
        'nombre': "Azucar.",
        'porcentaje_compra': 0
    }];

    $scope.negarAcceso = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/negarAccesoCompras.modal.html',
            controller: 'negarAccesoComprasModalController',
            keyboard: false,
            size: 'lg',
            backdrop: 'static',

        });

        modalInstance.result.then(function() {
            $location.path('/capacitacion');
        });
    };


    var cargarRecomendados = function() {

        bsLoadingOverlayService.start();

        ComprasService.getProductosPuntoVenta(puntoVenta, function(response) {
            if (response.success) {
                $scope.gruposAlimenticios = response.data;
            } else {
                console.log(response.message);
            }
            bsLoadingOverlayService.stop();
            $timeout(function() {
                $scope.animar = true;
            }, 1500)

        });
    };

    usuario.did = $scope.usuarioActivo.login_documento;
    //usuario.did = '1006330568';

    bsLoadingOverlayService.start();

    ComprasService.getConsolidadoComprasUltimoMes(usuario, function(response) {
        $scope.noHayDatos = false;
        if (response.success) {
            $scope.consumoUltimoMes = response.data;

            console.log($scope.consumoUltimoMes);

            puntoVenta['pid'] = response.puntoVenta;
            cargarRecomendados();
        } else {
            $scope.noHayDatos = true;
            $scope.negarAcceso();
            //console.log(response.message);
        }

        bsLoadingOverlayService.stop();
    });

    $scope.verGrupo = function(id) {

        var data = $scope.consumoUltimoMes[id - 1];

        $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/comprasGrupo.modal.html',
            controller: 'ComprasGrupoModalController',
            keyboard: false,
            size: 'lg',
            resolve: {
                data: function() {
                    return data;
                }
            }
        });


        $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/animacionCompras.modal.html',
            controller: 'AnimacionComprasModalController',
            keyboard: false,
            size: 'lg',
            resolve: {
                data: function() {
                    return data;
                }
            }
        });

    }




});
