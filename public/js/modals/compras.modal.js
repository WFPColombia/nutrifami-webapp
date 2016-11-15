nutrifamiApp.controller('ComprasGrupoModalController', function($scope, $uibModalInstance, $timeout, data, ngAudio) {
    $scope.data = data;

    $scope.playAudio = function(grupo_id) {
        var audio = ngAudio.load('audios/compras-resumen-' + grupo_id + '.mp3');
        audio.play();
    }
});

nutrifamiApp.controller('AnimacionComprasModalController', function($scope, $uibModalInstance, $timeout, data, ngAudio) {

    $scope.data = data;
    console.log($scope.data);

    if ($scope.data.carita == 'triste') {
        if ($scope.data.porcentaje_compra > $scope.data.porcentaje_recomendado) {
            $scope.data.carita = 'triste-2';
        }
    }

    $timeout(function() {
        $uibModalInstance.dismiss({ $value: 'cancel' });
    }, 8000)

});

nutrifamiApp.controller('negarAccesoComprasModalController', function($scope, $uibModalInstance) {


    $scope.cerrar = function() {
        $uibModalInstance.close();
    };


});
