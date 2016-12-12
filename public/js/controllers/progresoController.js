nutrifamiApp.controller('ProgresoController', function($scope, UsuarioService) {
    'use strict';

    $scope.progreso = true;

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    $scope.usuarioAvance = UsuarioService.getUsuarioAvance();
    $scope.usuarioFamilia = UsuarioService.getUsuarioFamilia();

});
