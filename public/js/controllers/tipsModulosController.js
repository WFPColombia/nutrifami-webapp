nutrifamiApp.controller('TipsModuloController', function($scope, $location, UsuarioService) {
    'use strict';

    $scope.tips = true;

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();


    $scope.groups = [{
        name: "La Alimentación",
        items: [
            'Prevenga deficiencias de nutrientes consumiendo una alimentación variada y colorida.',
            'Modere el consumo de alimentos con grasas para tener una buena salud. Prefiera aceites vegetales.',
            'Prevenga deficiencias de nutrientes con el consumo de una alimentación variada y colorida.',
            'Consuma alimentos de todos los grupos, prefiera los de cosecha ya que serán más frescos, económicos y disponibles.'
        ]
    }, {
        name: "Los Alimentos",
        items: [
            'Prevenga deficiencias de nutrientes consumiendo una alimentación variada y colorida.',
            'Modere el consumo de alimentos con grasas para tener una buena salud. Prefiera aceites vegetales.',
            'Prevenga deficiencias de nutrientes con el consumo de una alimentación variada y colorida.',
            'Consuma alimentos de todos los grupos, prefiera los de cosecha ya que serán más frescos, económicos y disponibles.'
        ]
    }, {
        name: "El plato saludable",
        items: [
            'Prevenga deficiencias de nutrientes consumiendo una alimentación variada y colorida.',
            'Modere el consumo de alimentos con grasas para tener una buena salud. Prefiera aceites vegetales.',
            'Prevenga deficiencias de nutrientes con el consumo de una alimentación variada y colorida.',
            'Consuma alimentos de todos los grupos, prefiera los de cosecha ya que serán más frescos, económicos y disponibles.'
        ]
    }, {
        name: "Los colores de los alimentos",
        items: [
            'Prevenga deficiencias de nutrientes consumiendo una alimentación variada y colorida.',
            'Modere el consumo de alimentos con grasas para tener una buena salud. Prefiera aceites vegetales.',
            'Prevenga deficiencias de nutrientes con el consumo de una alimentación variada y colorida.',
            'Consuma alimentos de todos los grupos, prefiera los de cosecha ya que serán más frescos, económicos y disponibles.'
        ]
    }];

});
