nutrifamiApp.directive('moduloInfo', function ($location) {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'views/directives/moduloInfo.drt.html',
        link: function ($scope, $element, $attrs) {
            $scope.cargando = false;
            $scope.totalLecciones = function () {
                return (Object.keys($scope.info.lecciones).length);
            };
            $scope.porcentajeAvance = function () {
                return(100 / $scope.totalLecciones() * $scope.info.avance.leccionesFinalizadas);
            };
            $scope.irAlModulo = function () {
                $scope.cargando = true;
                $location.path('/m/' + $scope.info.id);
            };
        }
    };
});
