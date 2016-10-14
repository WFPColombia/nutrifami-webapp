nutrifamiApp.controller('ComprasController', function($scope, ComprasService, ngAudio, bsLoadingOverlayService, UsuarioService) {
    'use strict';

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo()
    console.log($scope.usuarioActivo);
    $scope.compras = true;


    $scope.audio1 = ngAudio.load("audios/compras-intro.mp3");
    $scope.audio2 = ngAudio.load("audios/compras-dieta-variada.mp3");
    $scope.gruposAlimenticios = [];


    var usuario = {};
    var puntoVenta = {
        'pid': 0
    };

    var cargarRecomendados = function() {

        console.log("CargarR");
        bsLoadingOverlayService.start();

        ComprasService.getProductosPuntoVenta(puntoVenta, function(response) {
            if (response.success) {
                $scope.gruposAlimenticios = response.data;
                console.log($scope.gruposAlimenticios);
            } else {
                console.log(response.message);
            }
            bsLoadingOverlayService.stop();

        });
    };

    usuario.did = $scope.usuarioActivo.login_documento;
    //usuario.did = 66976632;

    bsLoadingOverlayService.start();

    ComprasService.getConsolidadoComprasUltimoMes(usuario, function(response) {
        $scope.noHayDatos = false;
        if (response.success) {
            $scope.consumoUltimoMes = response.data;
            puntoVenta['pid'] = response.puntoVenta;
            cargarRecomendados();
        } else {
            $scope.noHayDatos = true;
            console.log(response.message);
        }

        bsLoadingOverlayService.stop();
    });







});
