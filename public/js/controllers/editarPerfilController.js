/*global angular*/
nutrifamiApp.controller('EditarPerfilController', function($scope, $location, PerfilService, $anchorScroll, bsLoadingOverlayService, $timeout, UsuarioService) {
    'use strict';

    $anchorScroll();

    bsLoadingOverlayService.start();
    $scope.$on('$viewContentLoaded', function() {
        bsLoadingOverlayService.stop();
    });

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    //PerfilService.getLocation();
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


    if ($scope.usuarioActivo.birthdate !== null) {
        var nacimiento = $scope.usuarioActivo.birthdate;
        var n_ano = nacimiento.slice(0, 4);
        var n_mes = nacimiento.slice(5, 7) - 1;
        var n_dia = nacimiento.slice(8, 10);

        $scope.usuarioActivo.nacimiento = new Date(n_ano, n_mes, n_dia);
    } else {
        $scope.usuarioActivo.nacimiento = new Date(0, 0, 0);
    }


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

        PerfilService.editarUsuario(usuarioActivo, function(response) {
            if (response.success) {
                $scope.mensaje = {
                    estado: true,
                    texto: "Los datos han sido guardado con éxito",
                    success: true
                };
                UsuarioService.setUsuarioActivo(usuarioActivo, function(response) {});
            } else {

                $scope.mensaje = {
                    estado: true,
                    texto: "Ops!! Hubo un error y los datos no fueron guardados. Por favor intenta más tarde.",
                    success: true

                };
            }
            $anchorScroll();


            bsLoadingOverlayService.stop();


            $timeout(function() {
                $scope.mensaje.estado = false;
            }, 10000);


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
