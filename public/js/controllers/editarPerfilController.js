/*global angular*/
nutrifamiApp.controller('EditarPerfilController', function($scope, $location, $filter, PerfilService, $anchorScroll, bsLoadingOverlayService, $timeout, UsuarioService) {
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
        selectedOption: { id: $scope.usuarioActivo.etnia, name: $scope.usuarioActivo.etnia }
    };

    PerfilService.getLocation(function(response) {

        $scope.paises = response.paises;

        $scope.departamentos = response.estados;
        $scope.ciudades = response.ciudades;

        for (var pais in response.paises) {
            if ($scope.usuarioActivo.pais == response.paises[pais].name) {
                $scope.usuarioActivo.pais_id = {
                    id: response.paises[pais].id,
                    name: response.paises[pais].name,
                    phonecode: response.paises[pais].phonecode,
                    sortname: response.paises[pais].sortname,
                }

            }
        }

        for (var departamento in response.estados) {
            if ($scope.usuarioActivo.departamento == response.estados[departamento].name) {
                console.log(response.estados[departamento])
                $scope.usuarioActivo.departamento_id = {
                    id: response.estados[departamento].id,
                    name: response.estados[departamento].name,
                    country_id: response.estados[departamento].country_id,
                };
                $scope.departamentos_filter = [$scope.usuarioActivo.departamento_id];

            }
        }

        for (var ciudad in response.ciudades) {
            if ($scope.usuarioActivo.municipio == response.ciudades[ciudad].name) {
                console.log(response.ciudades[ciudad]);
                $scope.usuarioActivo.municipio_id = {
                    id: response.ciudades[ciudad].id,
                    name: response.ciudades[ciudad].name,
                    state_id: response.ciudades[ciudad].state_id,
                };
                $scope.ciudades_filter = [$scope.usuarioActivo.municipio_id];
            }
        }







    });






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
        console.log(usuarioActivo);
        usuarioActivo.genero = $scope.usuarioActivo.generos.selectedOption.id || '';
        usuarioActivo.etnia = $scope.usuarioActivo.etnias.selectedOption.id || '';


        for (var pais in $scope.paises) {
            if ($scope.paises[pais].id == usuarioActivo.pais_id) {
                usuarioActivo.pais = $scope.paises[pais].name;

            }
        }

        for (var departamento in $scope.departamentos) {
            if ($scope.departamentos[departamento].id == usuarioActivo.departamento_id) {
                usuarioActivo.departamento = $scope.departamentos[departamento].name;

            }
        }

        for (var ciudad in $scope.ciudades) {
            if ($scope.ciudades[ciudad].id == usuarioActivo.municipio_id) {
                usuarioActivo.municipio = $scope.ciudades[ciudad].name;

            }
        }


        var tempMonth = $scope.usuarioActivo.nacimiento.getMonth() + 1;
        var tempDay = $scope.usuarioActivo.nacimiento.getDate();
        if (tempMonth < 10) {
            tempMonth = "0" + tempMonth;
        }
        usuarioActivo.birthdate = $scope.usuarioActivo.nacimiento.getFullYear() + "-" + tempMonth + "-" + tempDay;
        delete usuarioActivo["generos"];
        delete usuarioActivo["etnias"];
        delete usuarioActivo["nacimiento"];
        delete usuarioActivo["pais_id"];
        delete usuarioActivo["departamento_id"];
        delete usuarioActivo["municipio_id"];






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

    $scope.updateDropDownDepartamentos = function(pais) {
        console.log(pais)
        $scope.departamentos_filter = $filter('filter')($scope.departamentos, { country_id: pais });
    }

    $scope.updateDropDownCiudades = function(estado) {
        console.log(estado);
        $scope.ciudades_filter = $filter('filter')($scope.ciudades, { state_id: estado });
        console.log($scope.ciudades_filter);
    }
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
