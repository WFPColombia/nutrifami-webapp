nutrifamiApp.controller('ComprasGrupoModalController', function($scope, $uibModalInstance, $timeout, data, ngAudio) {
    $scope.data = data;

    $scope.playAudio = function(grupo_id) {
        var audio = ngAudio.load('audios/compras-resumen-' + grupo_id + '.mp3');
        audio.play();
    }



});
