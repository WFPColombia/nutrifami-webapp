/*
 * Configuración de angular para la aplicación Web de nutrifami
 */

var nf2 = angular.module('nfweb', ['ui.router', 'ui.bootstrap', 'ngCookies', 'pascalprecht.translate', 'ngSanitize']);

nf2.run(function ($translate, $rootScope, $window) {
    console.log('run');
    
    // Language settings
    var stored_lang_key = localStorage.getItem('NG_TRANSLATE_LANG_KEY');
    if (stored_lang_key) {
        console.log('stored_lang_key');
        $rootScope.lang = stored_lang_key;
        $translate.use(stored_lang_key);
    } else {
        console.log('not stored_lang_key');
        var locale = $window.navigator.language || $window.navigator.userLanguage;
        var lang = locale.substring(0, 2);
        $rootScope.lang = lang;
        $translate.use(lang);
    }

});

nf2.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
    console.log('config');
    
    // Multilanguaje Settings

    $translateProvider
            .useStaticFilesLoader({
                prefix: 'http://app.nutrifami.org/translations/json.php?file=locale-',
                suffix: '.json'
            })
            .preferredLanguage('es')
            .useLocalStorage()
            .useMissingTranslationHandlerLog()
            .useSanitizeValueStrategy('sceParameters');
    
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
