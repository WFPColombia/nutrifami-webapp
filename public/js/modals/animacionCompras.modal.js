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
