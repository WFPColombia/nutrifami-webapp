nutrifamiApp.controller('diplomaModalController', function($scope, $uibModalInstance, data) {

    $scope.data = data;

    $scope.cerrar = function() {
        $uibModalInstance.close();
    };

    $scope.descargar = function() {
        console.log("Imprimir");
        html2canvas(document.getElementById('imprimirDiploma'), {

            onrendered: function(canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 798
                    }],
                    pageSize: {
                        width: 800,
                        height: 500
                    },
                    pageMargins: [1, 1, 1, 1]

                };
                pdfMake.createPdf(docDefinition).download("Diploma - " + $scope.data.modulo + ".pdf");
            }
        });
    }


});
