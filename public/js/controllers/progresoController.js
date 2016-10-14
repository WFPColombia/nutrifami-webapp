nutrifamiApp.controller('ProgresoController', function($scope, UsuarioService) {
    'use strict';

    $scope.progreso = true;

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    $scope.usuarioAvance = UsuarioService.getUsuarioAvance();
    $scope.usuarioFamiliaAvance = UsuarioService.getUsuarioFamiliaAvance();
    $scope.usuarioFamilia = UsuarioService.getUsuarioFamilia();
    //console.log($scope.usuarioActivo);
    console.log($scope.usuarioAvance);
    console.log($scope.usuarioFamiliaAvance);
    console.log($scope.usuarioFamilia);
    /*$scope.audio = ngAudio.load("audios/compras-intro.mp3");
     $scope.dietaVariada = ngAudio.load("audios/compras-dieta-variada.mp3");*/

    $scope.medallas = 0;
    $scope.nivel = 0;
    $scope.leccion = 0;
    for (var i in $scope.usuarioAvance[3]) {
        $scope.medallas = $scope.medallas + Object.keys($scope.usuarioAvance[3][i]).length;
        $scope.nivel = $scope.nivel + 1;
        $scope.leccion = Object.keys($scope.usuarioAvance[3][i]).length;
    }


    var totalUnidades = Object.keys(nutrifami.training.cap_lecciones).length;

    $scope.puntos = $scope.medallas * 100;

    $scope.porcentaje = parseInt((100 / totalUnidades) * $scope.medallas);

});
