nutrifamiApp.controller('HeaderController', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {

        $scope.informacion = false;
        $scope.breadcrumb = false;
        $scope.home = false;
        $scope.links = [];

        if ($location.$$path === '/') {
            $scope.home = true;
        }

        if ($location.$$path === '/perfil' || $location.$$path === '/editar-perfil') {
            $scope.informacion = true;
        }

        /*Si se esta mostrando una unidad, se activa el breadcrumb y se llena con la información que vienen de los parametros*/
        if ($routeParams.unidad != null) {
            $scope.breadcrumb = true;
            var totalUnidades = Object.keys(nutrifami.training.getUnidadesId($routeParams.leccion)).length;
            $scope.links.push(nutrifami.training.getModulo($routeParams.modulo).titulo);
            $scope.links.push(nutrifami.training.getLeccion($routeParams.leccion).titulo);
            $scope.links.push($routeParams.unidad + ' de ' + totalUnidades);
        }



    }
]);
