nutrifamiApp.directive('narradorDrt', function(UsuarioService) {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'views/directives/narrador.drt.html',
        link: function($scope, $element, $attrs) {
            
            console.log($scope.data);
            $scope.toogleNarrador = function() {
                $scope.data = !$scope.data;
                
                $scope.$parent.toogleNarrador($scope.data);
                
                var usuarioActivo = UsuarioService.getUsuarioActivo();
                usuarioActivo.narrador = $scope.data;
                UsuarioService.setUsuarioActivo(usuarioActivo, function(response){});
                
            };
        }
    };
});
