nutrifamiApp.controller('TipsController', function($scope, $location, UsuarioService) {
    'use strict';

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

    $scope.tips = true;

});
