nutrifamiApp.controller('misComprasIntroController', function($scope, ngAudio, bsLoadingOverlayService, UsuarioService) {
    'use strict';

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo()


    $scope.audio1 = ngAudio.load("audios/consejos-saludables-1.mp3");
    $scope.audio2 = ngAudio.load("audios/consejos-saludables-2.mp3");





});
