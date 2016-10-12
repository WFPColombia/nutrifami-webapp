nutrifamiMobile.controller('TipsController', function ($ionicPlatform, $scope, $location, $stateParams, AudioService, UsuarioService) {
    'use strict';
    /* BEGIN CORDOVA FILES
     $ionicPlatform.ready(function () {
     END CORDOVA FILES */

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    
    /* BEGIN CORDOVA FILES
     });
     END CORDOVA FILES */
});