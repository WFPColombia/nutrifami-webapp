nutrifamiApp.controller('registroModalController', function($scope, $uibModalInstance, $location, bsLoadingOverlayService, PerfilService, AuthenticationService) {

    var usuarioNuevo = {};

    $scope.registro = function() {
        usuarioNuevo = $scope.usuarioNuevo;
        usuarioNuevo.FAM_PER_JEFE = 0;
        $scope.error = "";
        bsLoadingOverlayService.start();
        PerfilService.agregarUsuario(usuarioNuevo, function(response) {

            if (response.success) {
                bsLoadingOverlayService.stop();
                AuthenticationService.Login($scope.usuarioNuevo.FAM_PER_DOCUMENTO, 'no-pass', function(response) {
                    bsLoadingOverlayService.start();
                    if (response.success) {
                        console.log("Entra")
                        AuthenticationService.SetCredentials($scope.usuarioNuevo.FAM_PER_DOCUMENTO, 'no-pass', response.message);
                        $uibModalInstance.dismiss('cancel');
                        bsLoadingOverlayService.stop();
                        $location.path('/capacitacion');
                    } else {
                        $scope.error = response.message;
                        bsLoadingOverlayService.stop();
                    }
                });
            } else {
                $scope.error = response.message;
                bsLoadingOverlayService.stop();
            }
        });
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});
