nutrifamiApp.factory('NutricompraService', ['$http', '$cookieStore', '$rootScope', '$timeout',
    function() {
        var service = {};

        var tipo_productos = [
            'azucares',
            'carnes',
            'cereal',
            'frutas',
            'grasas',
            'inadecuados',
            'leche'
        ];

        var inventario = {
            'azucares': 3,
            'carnes': 8,
            'cereal': 6,
            'frutas': 8,
            'grasas': 3,
            'inadecuados': 8,
            'leche': 4
        };





        /**
         * 
         * @param {type} callback
         * @returns {undefined}
         * NutrijuegoService.getProductosVitrina(function (response){});
         */
        service.getProductosVitrina = function(callback) {
            var response = obtenerProductos();
            /*var miPuntoVenta = JSON.parse(localStorage.getItem('puntoVenta'));
            if (miPuntoVenta === null) {
                nutrifami.consumo.getProductosPuntoVenta(puntoVenta, function(response) {
                    response.data = ordenarRecomendados(response.data);
                    localStorage.setItem("puntoVenta", JSON.stringify(response.data));
                    callback(response);
                });
            } else {
                var response = {
                    success: true,
                    data: miPuntoVenta
                };
                callback(response);
            }*/
            callback(response);
        };


        function obtenerProductos() {
            var productos = [];

            var cantidadProductos = 30;

            for (var i = 0; i < cantidadProductos; i++) {
                var tipo = tipo_productos[Math.floor((Math.random() * 7))];

                var numProducto = Math.floor((Math.random() * inventario[tipo]) + 1);;
                productos.push('ico_' + tipo + '_' + numProducto);
            }

            return (productos)


        }

        return service;
    }
]);
