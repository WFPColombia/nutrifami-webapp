/*
 * Configuración de angular para la aplicación Web de nutrifami
 */

var nf2 = angular.module('nfweb', ['ui.router', 'ui.bootstrap']);

nf2.run(function () {
    console.log('run');

});

nf2.config(function ($stateProvider, $urlRouterProvider) {
    console.log('config');
    
    $stateProvider.state('landing', {
        url: '/',
        //cache: false,
        templateUrl: 'src/landing/landing.html',
        controller: 'LandingCtrl'
    });
    
    $stateProvider.state('terms', {
        url: '/terminos-y-condiciones',
        //cache: false,
        templateUrl: 'src/terms/terms.html'
    });
    
    $urlRouterProvider.otherwise('/');
});
