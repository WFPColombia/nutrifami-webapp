nutrifamiApp.controller('registroModalController', function($scope, $uibModalInstance, $location, bsLoadingOverlayService, PerfilService, AuthenticationService) {

    var usuarioNuevo = {};

    $scope.registro = function() {
        usuarioNuevo = $scope.usuarioNuevo;
        usuarioNuevo.FAM_PER_JEFE = 0;
        bsLoadingOverlayService.start();
        PerfilService.agregarUsuario(usuarioNuevo, function(response) {

            if (response.success) {
                console.log("exito");
                bsLoadingOverlayService.stop();
            }

        });
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});
