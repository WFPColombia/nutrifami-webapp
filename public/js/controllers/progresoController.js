nutrifamiApp.controller('ProgresoController', function($scope, $uibModal, UsuarioService) {
    'use strict';

    $scope.progreso = true;

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    $scope.usuarioAvance = UsuarioService.getUsuarioAvance();
    $scope.usuarioFamilia = UsuarioService.getUsuarioFamilia();

    $scope.verDiploma = function(index) {
        var data = {
            nombre: $scope.usuarioActivo.nombre,
            apellido: $scope.usuarioActivo.apellido,
            modulo: usuarioAvance.diplomas[index]
        };

        var modalDiploma = $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/diploma.modal.html',
            controller: 'diplomaModalController',
            keyboard: false,
            size: 'lg',
            backdrop: 'static',
            windowClass: 'diploma',
            resolve: {
                data: function() {
                    return data;
                }
            }

        });
    }
});
