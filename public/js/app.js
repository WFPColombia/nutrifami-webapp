/*
 * Configuración de angular para la aplicación Web de nutrifami
 */
dependencies = ['Authentication', 'ngRoute', 'ngCookies', 'ngAudio', 'bsLoadingOverlay', 'ui.bootstrap', 'ngAnimate'];
'use strict';

// declare modules
angular.module('Authentication', []);

var nutrifamiApp = angular.module('NutrifamiWeb', dependencies);

nutrifamiApp.config(['$routeProvider', function ($routeProvider) {
        'use strict';

        $routeProvider.when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/login.tpl.html',
            hideMenus: true
        });

        $routeProvider.when('/', {
            controller: 'LandingController',
            templateUrl: 'views/landing.html'
        });

        $routeProvider.when('/capacitacion', {
            controller: 'CapacitacionController',
            templateUrl: 'views/capacitacion.html'
        });

        $routeProvider.when('/m/:modulo', {
            controller: 'ModuloController',
            templateUrl: 'views/modulo.html'
        });

        $routeProvider.when('/m/:modulo/:leccion/:unidad', {
            controller: 'UnidadController',
            templateUrl: 'views/unidad.html'
        });

        $routeProvider.when('/m/:modulo/:leccion/:unidad/leccion-terminada/', {
            controller: 'LeccionTerminadaController',
            templateUrl: 'views/leccionTerminada.tpl.html'
        });

        $routeProvider.when('/perfil', {
            controller: 'PerfilController',
            templateUrl: 'views/perfil.tpl.html'
        });

        $routeProvider.when('/editar-perfil', {
            controller: 'EditarPerfilController',
            templateUrl: 'views/editar-perfil.tpl.html'
        })

                .otherwise({redirectTo: '/'});
    }])


nutrifamiApp.run(function ($rootScope, $location, $cookieStore, bsLoadingOverlayService) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};

    bsLoadingOverlayService.setGlobalConfig({
        templateUrl: 'views/template/loading-overlay-template.html'
    });

    $rootScope.mensaje = {
        estado: false,
        texto: '',
        tiempo: 0
    };
    
    console.log("Run");
    nutrifami.getSessionId();
    nutrifami.training.initClient();
    
    if ($rootScope.globals.currentUser) {
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line

    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            $location.path('/');
        }
    });
}
);
