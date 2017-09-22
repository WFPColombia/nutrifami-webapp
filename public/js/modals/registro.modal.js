nutrifamiApp.controller('registroModalController', function($scope, $uibModalInstance, $filter, $location, bsLoadingOverlayService, PerfilService, AuthenticationService) {

    var usuarioNuevo = {};

    bsLoadingOverlayService.start();
    PerfilService.getLocation(function(response) {
        console.log(response);
        $scope.paises = response.countries;
        $scope.departamentos = response.states;
        $scope.ciudades = response.cities;
        bsLoadingOverlayService.stop();
        console.log($scope.ciudades);
    });

    $scope.registro = function() {
        usuarioNuevo = $scope.usuarioNuevo;
        usuarioNuevo.FAM_PER_JEFE = 0;
        $scope.error = "";

        for (pais in $scope.paises) {
            if ($scope.paises[pais].id == usuarioNuevo.FAM_PER_PAIS) {
                usuarioNuevo.FAM_PER_PAIS = $scope.paises[pais].name;
            }
        }


        for (departamento in $scope.departamentos) {
            if ($scope.departamentos[departamento].id == usuarioNuevo.FAM_PER_DEPARTAMENTO) {
                usuarioNuevo.FAM_PER_DEPARTAMENTO = $scope.departamentos[departamento].name;
            }
        }

        for (ciudad in $scope.ciudades) {
            if ($scope.ciudades[ciudad].id == usuarioNuevo.FAM_PER_CIUDAD) {
                usuarioNuevo.FAM_PER_CIUDAD = $scope.ciudades[ciudad].name;
            }
        }

        console.log(usuarioNuevo);
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
                        nutrifami.training.initClient('', function() {
                            $location.path('/capacitacion');
                            bsLoadingOverlayService.stop();
                        });
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

    $scope.updateDropDownDepartamentos = function(pais) {
        console.log(pais)
        $scope.departamentos_filter = $filter('filter')($scope.departamentos, { country_id: pais }, true);
    }

    $scope.updateDropDownCiudades = function(estado) {
        console.log(estado);
        $scope.ciudades_filter = $filter('filter')($scope.ciudades, { state_id: estado }, true);
        console.log($scope.ciudades_filter);
    }
});
