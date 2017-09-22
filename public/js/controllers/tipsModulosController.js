nutrifamiApp.controller('TipsModuloController', function($scope, $location, $routeParams, $anchorScroll, bsLoadingOverlayService, UsuarioService, ngAudio, TipsService) {
    'use strict';
    $scope.tips = true;

    $anchorScroll();

    /* Overloading*/
    bsLoadingOverlayService.start();
    /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
    $scope.$on('$viewContentLoaded', function() {

        bsLoadingOverlayService.stop();
    });

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    $scope.lecciones = [];


    /* Se hace un try por si el usuario intenta ingresar a la URL a otro modulo que lo  lleve al home */
    try {
        $scope.modulo = nutrifami.training.getModulo($routeParams.modulo);
        $scope.modulo.totalLecciones = 0;       

        $scope.lids = nutrifami.training.getLeccionesId($routeParams.modulo);
        for (var lid in $scope.lids) {
            var tempLeccion = nutrifami.training.getLeccion($scope.lids[lid]);

            if (tempLeccion.activo == 1) {  
                $scope.lecciones.push(tempLeccion);
            }

        }
        
        $scope.modulo.titulo.audio.audio = ngAudio.load($scope.modulo.titulo.audio.url);

        console.log($scope.lecciones);
        console.log($scope.modulo);

    } catch (err) {
        console.log(err);
        $location.path('/capacitacion');
    }
    
    $scope.grupos = [];
    
    for(var i in $scope.lecciones){
        
        var tempGrupo = {
            name: $scope.lecciones[i].titulo.texto,
            items: []
        };
        
        tempGrupo.items = TipsService.getTipsByLeccion($scope.lecciones[i].id);

        $scope.grupos.push(tempGrupo);
        
    }
    
    console.log($scope.grupos);


    $scope.groups2 = [{
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

console.log($scope.groups2);


});
