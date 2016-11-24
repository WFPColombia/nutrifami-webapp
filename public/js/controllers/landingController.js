/*global angular*/
nutrifamiApp.controller('LandingController', function($scope, $location, $anchorScroll, $uibModal, $window, $document, bsLoadingOverlayService, anchorSmoothScrollService, AuthenticationService) {
    'use strict';

    $anchorScroll();

    /* Overloading*/
    bsLoadingOverlayService.start();
    /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
    $scope.$on('$viewContentLoaded', function() {
        bsLoadingOverlayService.stop();
    });

    AuthenticationService.ClearCredentials();
    localStorage.clear();

    $scope.scrolled = false;

    $document.on('scroll', function() {
        // do your things like logging the Y-axis
        if ($window.scrollY > 775) {
            if (!$scope.scrolled) {
                $scope.scrolled = true;
            }

        } else {
            if ($scope.scrolled) {
                $scope.scrolled = false;
            }

        }

        // or pass this to the scope
        $scope.$apply(function() {
            $scope.pixelsScrolled = $window.scrollY;
        });
    });

    $scope.login = function() {
        console.log("Click");
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, 'no-pass', function(response) {
            console.log(response);
            if (response.success) {
                AuthenticationService.SetCredentials($scope.username, $scope.password, response.message);
                $location.path('/capacitacion');
            } else {
                $scope.error = response.message;
                $scope.dataLoading = false;
            }
        });
    };

    $scope.gotoElement = function(eID) {
        $location.hash('bottom');

        anchorSmoothScrollService.scrollTo(eID);
    };

    $scope.modalRegistro = function() {
        console.log("Abrir Registro");

        var registroModal = $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/registro.modal.html',
            controller: 'registroModalController',
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
        });

        registroModal.result.then(function(estado) {
            /*$scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password, response.message);
                    $location.path('/capacitacion');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });*/
        });

    };
});
