nutrifamiApp.controller('nc_salirModalController', function(data, $location, $scope, $uibModalInstance, NutricompraService) {

    $scope.data = data;
    $scope.boton1 = function() {
        console.log("Boton1");
        $uibModalInstance.close();
        if ($scope.data.enlace1 != '') {
            NutricompraService.clearProductos(function(response) {
                $location.path('/' + $scope.data.enlace1);
            });



        }
    };

    $scope.boton2 = function() {
        console.log("Boton2");
        $uibModalInstance.close();
        if ($scope.data.enlace2 != '') {
            NutricompraService.clearProductos(function(response) {
                $location.path('/' + $scope.data.enlace2);
            });


        }
    }


});
