/*global angular*/
nutrifamiApp.controller('EditarPerfilController', function($scope, $location, PerfilService, $anchorScroll, bsLoadingOverlayService, $timeout, UsuarioService) {
    'use strict';

    $anchorScroll();

    bsLoadingOverlayService.start();
    $scope.$on('$viewContentLoaded', function() {
        bsLoadingOverlayService.stop();
    });

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    $scope.usuarioActivo.generos = {
        availableOptions: [
            { id: 'F', name: 'Femenino' },
            { id: 'M', name: 'Masculino' }
        ],
        selectedOption: { id: $scope.usuarioActivo.genero, name: $scope.usuarioActivo.genero }
    };
    $scope.usuarioActivo.etnias = {
        availableOptions: [
            { id: 'AFROCOLOMBIANOS', name: 'Afrocolombianos' },
            { id: 'INDIGENA', name: 'Indigenas' },
            { id: 'MESTIZO', name: 'Mestizo' },
            { id: 'OTROS', name: 'Otros' },
            { id: 'NINGUNO', name: 'Ninguno' }
        ],
        selectedOption: { id: $scope.usuarioActivo.etnia, name: usuarioActivo.etnia }
    };

    var nacimiento = $scope.usuarioActivo.birthdate
    $scope.usuarioActivo.nacimiento = new Date(nacimiento.slice(0, 4), nacimiento.slice(5, 7), nacimiento.slice(8, 10));

    $scope.update = function() {
        bsLoadingOverlayService.start();

        var usuarioActivo = Object.assign({}, $scope.usuarioActivo);
        usuarioActivo.genero = $scope.usuarioActivo.generos.selectedOption.id || '';
        usuarioActivo.etnia = $scope.usuarioActivo.etnias.selectedOption.id || '';
        var tempMonth = $scope.usuarioActivo.nacimiento.getMonth() + 1;
        var tempDay = $scope.usuarioActivo.nacimiento.getDate();
        if (tempMonth < 10) {
            tempMonth = "0" + tempMonth;
        }
        usuarioActivo.birthdate = $scope.usuarioActivo.nacimiento.getFullYear() + "-" + tempMonth + "-" + tempDay;
        delete usuarioActivo["generos"];
        delete usuarioActivo["etnias"];
        delete usuarioActivo["nacimiento"];

        console.log(usuarioActivo);
        PerfilService.editarUsuario(usuarioActivo, function(response) {
            if (response.success) {
                $scope.mensaje = {
                    estado: true,
                    texto: "Los datos han sido guardado con éxito",
                    success: true
                };
                UsuarioService.setUsuarioActivo(usuarioActivo, function(response) {});
                bsLoadingOverlayService.stop();
                //$location.path('/perfil');
            } else {
                bsLoadingOverlayService.stop();

                $scope.mensaje = {
                    estado: true,
                    texto: "Ops!! Hubo un error y los datos no fueron guardados. Por favor intenta más tarde.",
                    success: true

                };

                console.log(response);
            }

        });

    };
});

nutrifamiApp.filter('capitalize', function() {
    'use strict';
    return function(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    };
});
