nutrifamiApp.directive('moduloInfo', function($location) {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'views/directives/moduloInfo.drt.html',
        link: function($scope, $element, $attrs) {
            $scope.totalLecciones = function() {
                var totalLecciones = 0;
                for (var lid in $scope.info.lecciones) {
                    var tempLeccion = nutrifami.training.getLeccion($scope.info.lecciones[lid]);
                    if (tempLeccion.activo == 1) {
                        totalLecciones++;
                    }
                }
                return (totalLecciones);
            };
            $scope.porcentajeAvance = function() {
                return (100 / $scope.totalLecciones() * $scope.info.avance.leccionesFinalizadas);
            };
            $scope.irAlModulo = function() {

                $location.path('/m/' + $scope.info.id);
            };
        }
    };
});
