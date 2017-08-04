/*global angular*/
nutrifamiApp.controller('LandingController', function($scope, $location, $anchorScroll, $uibModal, $window, $document, bsLoadingOverlayService, anchorSmoothScrollService, AuthenticationService, PerfilService) {
    'use strict';

    $anchorScroll();

    /* Overloading*/



    AuthenticationService.ClearCredentials();
    //localStorage.clear();
    localStorage.removeItem("usuarioCapacitacion");
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("usuarioAvance");
    localStorage.removeItem("usuarioFamilia");
    localStorage.removeItem("usuarioFamiliaAvance");
    localStorage.removeItem("misCompras");

  

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
        bsLoadingOverlayService.start();
        AuthenticationService.Login($scope.username, 'no-pass', function(response) {
            if (response.success) {
                AuthenticationService.SetCredentials($scope.username, $scope.password, response.message);
                nutrifami.training.initClient('', function() {
                    $location.path('/capacitacion');
                    bsLoadingOverlayService.stop();
                });


            } else {
                $scope.error = response.message;
                bsLoadingOverlayService.stop();
            }
        });
    };

    $scope.gotoElement = function(eID) {
        $location.hash('bottom');

        anchorSmoothScrollService.scrollTo(eID);
    };

    $scope.modalRegistro = function() {
        var registroModal = $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/registro.modal.html',
            controller: 'registroModalController',
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
        });

        registroModal.result.then(function(estado) {

        });

    };


    $scope.slides = [{
        imagen: '../img/landing-slider-1-aprendre.png',
        titulo: 'Aprenda con Nutrifami',
        texto: '5 módulos para Aprender Jugando. Lea, escuche y seleccione las opciones de respuesta. Podrá evaluar sus conocimientos y recibir importantes consejos.',
        id: 0

    }, {
        imagen: '../img/landing-slider-2-mi-progreso.png',
        titulo: 'Mi Progreso',
        texto: 'Aquí puede ver cuánto ha avanzado con Nutrifami y descargar los diplomas obtenidos en cada módulo.',
        id: 1

    }, {
        imagen: '../img/landing-slider-3-mis-compras.png',
        titulo: 'Mis Compras',
        texto: 'Si es beneficiario de Bonos del Programa Mundial de Alimentos - PMA, Nutrifami analiza sus compras y le brinda consejos para la diversidad de su dieta y una alimentación balanceada y nutritiva.',
        id: 2

    }, {
        imagen: '../img/landing-slider-4-consejos.png',
        titulo: 'Consejos Saludables',
        texto: 'En esta sección encontrará consejos y recomendaciones sobre nutrición, alimentación y hábitos saludables.',
        id: 3

    }, {
        imagen: '../img/landing-slider-5-juego.png',
        titulo: 'NutriCompra',
        texto: 'Divertido juego para que ponga a prueba todas sus habilidades, para elegir adecuadamente los alimentos para el hogar.',
        id: 4

    }];


});
