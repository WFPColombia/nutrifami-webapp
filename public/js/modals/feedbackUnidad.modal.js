nutrifamiApp.controller('FeedbackUnidadModalController', function($scope, $uibModalInstance, $timeout, data) {
    $scope.data = data;

    $scope.data.activo = false;
    $timeout(function() {
        $scope.data.activo = true;
    }, 5000);


    $scope.clickBoton = function() {
        $uibModalInstance.close($scope.data.estado);
    };
});
