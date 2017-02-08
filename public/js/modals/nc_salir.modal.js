nutrifamiApp.controller('nc_salirModalController', function(data, $location, $scope, $uibModalInstance) {

    $scope.data = data;
    $scope.cerrar = function() {
        $uibModalInstance.close();
        if ($scope.data.enlace1 != '') {
            $location.path('/' + $scope.data.enlace1);

        }
    };

    $scope.salir = function() {
        $uibModalInstance.close();
        if ($scope.data.enlace2 != '') {
            $location.path('/' + $scope.data.enlace2);

        }
    }


});
