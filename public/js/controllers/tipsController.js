nutrifamiApp.controller('TipsController', function($scope, $location, ngAudio, UsuarioService) {
    'use strict';
    $scope.tips = true;
    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

    
    
    $scope.audio1 = ngAudio.load("audios/consejos-saludables-1.mp3");
    $scope.audio2 = ngAudio.load("audios/consejos-saludables-2.mp3");
    
    $scope.modulos = [];
    // Obtenemos los ids de los modulos de la capacitación 3


    try {

        $scope.mids = nutrifami.training.getModulosId(3);
        /*Creamos un arreglo para poder recorerlo y mostrarlo a traves de directivas */
        for (var mid in $scope.mids) {
            var tempModulo = nutrifami.training.getModulo($scope.mids[mid]);
            tempModulo.titulo.audio.audio = ngAudio.load(tempModulo.titulo.audio.url);
            $scope.modulos.push(tempModulo);
        }
        
        console.log($scope.modulos);

    } catch (err) {
        $location.path('/capacitacion');
    }

});
