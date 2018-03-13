/*global angular*/
nf2.controller('LandingCtrl', function($scope, $rootScope, $location, $anchorScroll, $window, $document, anchorSmoothScrollService) {
    $anchorScroll();

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

    $scope.gotoElement = function(eID) {
        $location.hash('bottom');
        anchorSmoothScrollService.scrollTo(eID);
    };

    $scope.slides = [{
        imagen: '../img/landing-slider-1-aprendre.png',
        titulo: 'Aprenda con Nutrifami',
        texto: '5 módulos para Aprender Jugando. Lea, escuche y seleccione las opciones de respuesta. Podrá evaluar sus conocimientos y recibir importantes consejos!',
        id: 0

    }, {
        imagen: '../img/landing-slider-2-mi-progreso.png',
        titulo: 'Mi progreso',
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
        titulo: 'Nutricompra',
        texto: 'Divertido juego para que ponga a prueba todas sus habilidades, para elegir adecuadamente los alimentos para su hogar.',
        id: 4

    }];


});
