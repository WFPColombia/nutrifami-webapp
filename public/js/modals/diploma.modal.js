nutrifamiApp.controller('diplomaModalController', function($scope, $uibModalInstance, data) {

    $scope.data = data;

    $scope.cerrar = function() {
        $uibModalInstance.close();
    };


});
