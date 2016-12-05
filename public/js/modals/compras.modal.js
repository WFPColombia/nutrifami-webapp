nutrifamiApp.controller('ComprasGrupoModalController', function($scope, $uibModalInstance, $timeout, data, ngAudio) {
    $scope.data = data;

    $scope.playAudio = function(grupo_id) {
        var audio = ngAudio.load('audios/compras-resumen-' + grupo_id + '.mp3');
        audio.play();
    }
});

nutrifamiApp.controller('negarAccesoComprasModalController', function($scope, $uibModalInstance) {


    $scope.cerrar = function() {
        $uibModalInstance.close();
    };


});
