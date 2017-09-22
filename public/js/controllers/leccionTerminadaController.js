/*global angular*/
nutrifamiApp.controller('LeccionTerminadaController', function($scope, $location, $anchorScroll, $routeParams, bsLoadingOverlayService, ngAudio, UsuarioService, $uibModal, CapacitacionService) {
    'use strict';

    $anchorScroll();

    bsLoadingOverlayService.start();
    $scope.$on('$viewContentLoaded', function() {
        bsLoadingOverlayService.stop();
    });

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    var diploma = false;

    usuarioAvance = JSON.parse(localStorage.getItem('usuarioAvance'));

    try {

        $scope.leccion = nutrifami.training.getLeccion($routeParams.leccion);
        $scope.modulo = nutrifami.training.getModulo($routeParams.modulo);
        console.log($scope.modulo);
        $scope.audios = {
            'leccionCompletada': 'audios/muy-bien-leccion-completada.mp3',
            'audioPuntos': 'audios/' + $scope.leccion.finalizado.puntos + '-puntos-ganados.mp3',
            'audioFinalizado': 'assets/' + $scope.leccion.finalizado.audio.nombre,
        };

        $scope.leccion.finalizado.audio.leccionCompletada = ngAudio.load('audios/muy-bien-leccion-completada.mp3');
        $scope.leccion.finalizado.audio.audio = ngAudio.load($scope.leccion.finalizado.audio.url);
        //$scope.leccion.finalizado.audio.audioPuntos = ngAudio.load("audios/" + $scope.leccion.finalizado.puntos + "-puntos-ganados.mp3");

        if ($scope.usuarioActivo.narrador) {
            //$scope.leccion.finalizado.audio.leccionCompletada.play();

            //$scope.leccion.finalizado.audio.leccionCompletada.complete(function() {
            //$scope.leccion.finalizado.audio.leccionCompletada.stop();
            $scope.leccion.finalizado.audio.audio.play();
            $scope.leccion.finalizado.audio.audio.complete(function() {
                $scope.leccion.finalizado.audio.audio.stop();
            });
            //});
        }

        $scope.lecciones = CapacitacionService.getLeccionesActivas($routeParams.modulo);
        $scope.usuarioAvance = UsuarioService.getUsuarioAvance();

        if ($scope.lecciones.length == Object.keys($scope.usuarioAvance[3][$routeParams.modulo]).length) {
            diploma = true;
        }


    } catch (err) {
        $location.path('/capacitacion');
    }


    $scope.leccionCompletada = {};
    //$scope.leccionCompletada.audio = ngAudio.load("audios/muy-bien-leccion-completada.mp3");



    $scope.continuar = function() {
        if (diploma) {

            var data = {
                nombre: $scope.usuarioActivo.nombre,
                apellido: $scope.usuarioActivo.apellido,
                modulo: $scope.modulo.titulo.texto
            };

            var modalDiploma = $uibModal.open({
                animation: true,
                templateUrl: 'views/modals/diploma.modal.html',
                controller: 'diplomaModalController',
                keyboard: false,
                size: 'lg',
                backdrop: 'static',
                windowClass: 'diploma',
                resolve: {
                    data: function() {
                        return data;
                    }
                }

            });

            modalDiploma.result.then(function() {
                $location.path('/capacitacion');
            });


        } else {
            $location.path("/m/" + $routeParams.modulo);

        }

    };

});
