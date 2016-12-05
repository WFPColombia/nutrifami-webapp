nutrifamiApp.controller('misComprasGrupoController', function($scope, $routeParams, $anchorScroll, ComprasService, ngAudio, bsLoadingOverlayService, UsuarioService) {
    'use strict';

    $anchorScroll();

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo()
    $scope.compras = true;

    var usuario = {};
    var puntoVenta = {
        'pid': 0
    };

    usuario.did = $scope.usuarioActivo.login_documento;
    //usuario.did = '1006330568';
    usuario.nombre = $scope.usuarioActivo.nombre;

    var cargarRecomendados = function() {

        bsLoadingOverlayService.start();

        ComprasService.getProductosPuntoVenta(puntoVenta, function(response) {
            if (response.success) {
                $scope.recomendados = response.data[$routeParams.grupo - 1];
            } else {}
            bsLoadingOverlayService.stop();


        });
    };

    bsLoadingOverlayService.start();

    ComprasService.getConsolidadoComprasUltimoMes(usuario, function(response) {
        if (response.success) {
            $scope.consumoUltimoMes = response.data;
            console.log($scope.consumoUltimoMes);
            puntoVenta['pid'] = response.puntoVenta;
            cargarRecomendados();
        } else {
            $scope.negarAcceso();
        }

        bsLoadingOverlayService.stop();
    });

    $scope.data = $scope.consumoUltimoMes[$routeParams.grupo - 1];
});
