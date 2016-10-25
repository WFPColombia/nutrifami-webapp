nutrifamiApp.controller('LoginModalController', function($scope, $uibModalInstance, $location, AuthenticationService) {
    $scope.login = function() {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function(response) {
            console.log(response);
            if (response.success) {
                AuthenticationService.SetCredentials($scope.username, $scope.password, response.message);
                $uibModalInstance.close();
                $location.path('/capacitacion');
            } else {
                console.log("Entra por acà");
                $scope.error = response.message;
                $scope.dataLoading = false;
            }
        });
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});
