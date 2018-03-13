nf2.directive('languageDrt', function ($rootScope, $translate) {
    return {
        restrict: 'E',
        scope: {
            position: '='
        },
        templateUrl: 'directives/language/language.html',
        link: function ($scope, $element, $attrs) {
            $scope.lang = $rootScope.lang;
            
            $scope.languages = [
                {
                    id: 'es',
                    name:'Español'
                },
                {
                    id: 'en',
                    name:'Ingles'
                },
                {
                    id: 'fr',
                    name:'Francés'
                }
            ];
            
            $scope.changeLanguage = function (langKey) {
                console.log('changeLanguage '+ langKey);
                $translate.use(langKey);
            };
            
            

            $rootScope.$on('$translateChangeSuccess', function (event, data) {
                console.log('$translateChangeSuccess');
                var language = data.language;
                $rootScope.lang = language;
                $scope.lang = language;
            });
            

        }
    };
});