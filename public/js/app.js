/*
 * Configuración de angular para la aplicación Web de nutrifami
 */
dependencies = ['Authentication', 'ngRoute', 'ngCookies', 'ngAudio', 'bsLoadingOverlay', 'ui.bootstrap', 'ngAnimate', '720kb.socialshare'];
'use strict';

// declare modules
angular.module('Authentication', []);

var nutrifamiApp = angular.module('NutrifamiWeb', dependencies);


nutrifamiApp.run(function($rootScope, $location, $cookieStore, bsLoadingOverlayService) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};

    bsLoadingOverlayService.setGlobalConfig({
        templateUrl: 'views/template/loading-overlay-template.html'
    });

    nutrifami.getSessionId();
    //nutrifami.training.initClient(); // Ahora se carga cuando se hace login y se debe buscar la info guardada en el localstorage

    if ($rootScope.globals.currentUser) {
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line

    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/terminos-y-condiciones' && $location.path() !== '/login' && !$rootScope.globals.currentUser) {
            $location.path('/');
        }
    });
});

nutrifamiApp.config(['$routeProvider', function($routeProvider) {
    'use strict';


    $routeProvider.when('/terminos-y-condiciones', {
        templateUrl: 'views/terminos.html',
        hideMenus: true
    });

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
        templateUrl: 'views/leccionTerminada.html'
    });

    $routeProvider.when('/perfil', {
        controller: 'PerfilController',
        templateUrl: 'views/perfil.html'
    });

    $routeProvider.when('/editar-perfil', {
        controller: 'EditarPerfilController',
        templateUrl: 'views/editar-perfil.tpl.html'
    });

    $routeProvider.when('/sobre-nutrifami', {
        controller: 'SobreController',
        templateUrl: 'views/sobre.html'
    });

    $routeProvider.when('/mis-compras', {
        controller: 'misComprasController',
        templateUrl: 'views/misCompras.html'
    });

    $routeProvider.when('/mis-compras/intro', {
        controller: 'misComprasIntroController',
        templateUrl: 'views/misComprasIntro.html'
    });

    $routeProvider.when('/mis-compras/:grupo', {
        controller: 'misComprasGrupoController',
        templateUrl: 'views/misComprasGrupo.html'
    });

    $routeProvider.when('/mi-progreso', {
        controller: 'ProgresoController',
        templateUrl: 'views/progreso.html'
    });

    $routeProvider.when('/tips', {
        controller: 'TipsController',
        templateUrl: 'views/tips.html'
    });

    $routeProvider.when('/tips/:modulo', {
        controller: 'TipsModuloController',
        templateUrl: 'views/tipsModulo.html'
    });

    $routeProvider.when('/nutricompra', {
        controller: 'nc_homeController',
        templateUrl: 'views/nutricompra/nc_home.html'
    });

    $routeProvider.when('/nutricompra/como-jugar', {
        controller: 'nc_comoJugarController',
        templateUrl: 'views/nutricompra/nc_comoJugar.html'
    });

    $routeProvider.when('/nutricompra/jugar', {
        controller: 'nc_jugarController',
        templateUrl: 'views/nutricompra/nc_jugar.html'
    });

    $routeProvider.when('/nutricompra/jugar/resumen', {
        controller: 'nc_jugarResumenController',
        templateUrl: 'views/nutricompra/nc_resumen.html'
    });

    $routeProvider.when('/nutricompra/jugar/terminar', {
        controller: 'nc_jugarTerminarController',
        templateUrl: 'views/nutricompra/nc_terminar.html'
    })


    .otherwise({ redirectTo: '/capacitacion' });
}])
