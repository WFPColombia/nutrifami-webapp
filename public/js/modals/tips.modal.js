nutrifamiApp.controller('TipsModalController', function($scope, $uibModalInstance, $timeout, data, TipsService) {
    $scope.data = data;

    $scope.tips = TipsService.getTipsByLeccion(data.leccion);
    
    
    var nran = Math.floor((Math.random() * $scope.tips.length));
    $scope.tip = $scope.tips[nran];
    $scope.clickBoton = function() {
        
    };
    
    $scope.toogleNarrador = function(narrador){
        
        $uibModalInstance.close(narrador);
        
    }
});
