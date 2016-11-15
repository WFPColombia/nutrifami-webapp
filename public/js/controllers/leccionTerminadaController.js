/*global angular*/
nutrifamiApp.controller('LeccionTerminadaController', function($scope, $location, $anchorScroll, $routeParams, bsLoadingOverlayService, ngAudio, UsuarioService) {
    'use strict';

    $anchorScroll();

    bsLoadingOverlayService.start();
    $scope.$on('$viewContentLoaded', function() {
        bsLoadingOverlayService.stop();
    });

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

    $scope.mensaje = "Ha finalizado la leccion";

    try {

        $scope.leccion = nutrifami.training.getLeccion($routeParams.leccion);
        $scope.modulo = $routeParams.modulo;
        $scope.audios = {
            'leccionCompletada': 'audios/muy-bien-leccion-completada.mp3',
            'audioPuntos': 'audios/' + $scope.leccion.finalizado.puntos + '-puntos-ganados.mp3',
            'audioFinalizado': 'assets/' + $scope.leccion.finalizado.audio.nombre,
        };

        $scope.leccion.finalizado.audio.leccionCompletada = ngAudio.load('audios/muy-bien-leccion-completada.mp3');
        $scope.leccion.finalizado.audio.audio = ngAudio.load($scope.leccion.finalizado.audio.url);
        //$scope.leccion.finalizado.audio.audioPuntos = ngAudio.load("audios/" + $scope.leccion.finalizado.puntos + "-puntos-ganados.mp3");

        if ($scope.usuarioActivo.narrador) {
            $scope.leccion.finalizado.audio.leccionCompletada.play();

            $scope.leccion.finalizado.audio.leccionCompletada.complete(function() {
                $scope.leccion.finalizado.audio.leccionCompletada.stop();
                $scope.leccion.finalizado.audio.audio.play();
                $scope.leccion.finalizado.audio.audio.complete(function() {
                    $scope.leccion.finalizado.audio.audio.stop();
                });
            });
        }

    } catch (err) {
        $location.path('/capacitacion');
    }


    $scope.leccionCompletada = {};
    //$scope.leccionCompletada.audio = ngAudio.load("audios/muy-bien-leccion-completada.mp3");



    $scope.continuar = function() {
        $location.path("/app/capacitacion/" + $stateParams.modulo);
    };

});
