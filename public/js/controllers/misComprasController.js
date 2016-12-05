nutrifamiApp.controller('misComprasController', function($scope, $timeout, $location, $uibModal, $anchorScroll, ComprasService, ngAudio, bsLoadingOverlayService, UsuarioService) {
    'use strict';

    $anchorScroll();

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo()
    $scope.compras = true;


    $scope.audio1 = ngAudio.load("audios/compras-intro.mp3");
    $scope.audio2 = ngAudio.load("audios/compras-dieta-variada.mp3");

    var usuario = {};

    $scope.consumoUltimoMes = [{
        'nombre': "Cereales, raíces, tubérculos y plátanos.",
        'porcentaje_compra': 0,
        'grupo_id': '1'
    }, {
        'nombre': "Carnes, huevos y leguminosas secas.",
        'porcentaje_compra': 0,
        'grupo_id': '2'

    }, {
        'nombre': "Leches y otros productos lácteos.",
        'porcentaje_compra': 0,
        'grupo_id': '3'
    }, {
        'nombre': "Frutas y verduras.",
        'porcentaje_compra': 0,
        'grupo_id': '4'
    }, {
        'nombre': "Grasas.",
        'porcentaje_compra': 0,
        'grupo_id': '5'
    }, {
        'nombre': "Azucar.",
        'porcentaje_compra': 0,
        'grupo_id': '6'
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

    usuario.did = $scope.usuarioActivo.login_documento;
    //usuario.did = '1006330568';

    bsLoadingOverlayService.start();

    ComprasService.getConsolidadoComprasUltimoMes(usuario, function(response) {
        $scope.noHayDatos = false;
        if (response.success) {
            $scope.consumoUltimoMes = response.data;

            //cargarRecomendados();
            $timeout(function() {
                $scope.animar = true;
            }, 1500);
        } else {
            $scope.noHayDatos = true;
            $scope.negarAcceso();
        }

        bsLoadingOverlayService.stop();
    });
});
