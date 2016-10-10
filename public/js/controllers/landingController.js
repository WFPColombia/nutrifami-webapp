/*global angular*/
nutrifamiApp.controller('LandingController', function ($scope, $location, $anchorScroll, $uibModal, $window, $document, bsLoadingOverlayService, anchorSmoothScrollService, AuthenticationService) {
    'use strict';

    $anchorScroll();

    /* Overloading*/
    bsLoadingOverlayService.start();
    /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
    $scope.$on('$viewContentLoaded', function () {
        bsLoadingOverlayService.stop();
    });

    AuthenticationService.ClearCredentials();
    localStorage.clear();

    $scope.scrolled = false;

    $document.on('scroll', function () {
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
        $scope.$apply(function () {
            $scope.pixelsScrolled = $window.scrollY;
        });
    });

    $scope.gotoElement = function (eID) {
        $location.hash('bottom');

        anchorSmoothScrollService.scrollTo(eID);
    };

    $scope.modalLogin = function () {
        console.log("Abrir Login");

        var loginModal = $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/login.modal.html',
            controller: 'LoginModalController',
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
        });

        loginModal.result.then(function (estado) {
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