/*global angular*/
nutrifamiApp.controller('LeccionTerminadaController', function($scope, $anchorScroll, $routeParams, bsLoadingOverlayService) {
    'use strict';

    $anchorScroll();

    /* Overloading*/
    bsLoadingOverlayService.start();
    /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
    $scope.$on('$viewContentLoaded', function() {
        bsLoadingOverlayService.stop();
    });

    $scope.mensaje = "Ha finalizado la leccion";

    $scope.leccion = nutrifami.training.getLeccion($routeParams.leccion);
    $scope.modulo = $routeParams.modulo;
    $scope.audios = {
        'leccionCompletada': 'audios/muy-bien-leccion-completada.mp3',
        'audioPuntos': 'audios/' + $scope.leccion.finalizado.puntos + '-puntos-ganados.mp3',
        'audioFinalizado': 'assets/' + $scope.leccion.finalizado.audio.nombre,
    };


    //AudioService.preloadSimple($scope.audios);


    /*
        $timeout(function() {
            AudioService.play('leccionCompletada');
        }, 1000);*/

    $scope.leccionCompletada = {};
    //$scope.leccionCompletada.audio = ngAudio.load("audios/muy-bien-leccion-completada.mp3");



    console.log($scope.leccion);

    //$scope.leccion.finalizado.audio.audio = ngAudio.load("assets/" + $scope.leccion.finalizado.audio.nombre);
    //$scope.leccion.finalizado.audio.audioPuntos = ngAudio.load("audios/" + $scope.leccion.finalizado.puntos + "-puntos-ganados.mp3");

    $scope.playAudio = function(audio) {
        AudioService.play(audio);
    };

    $scope.continuar = function() {
        AudioService.unload($scope.audios);
        $location.path("/app/capacitacion/" + $stateParams.modulo);
    };

});
