nutrifamiApp.factory('NutricompraService', ['$http', '$cookieStore', '$rootScope', '$timeout',
    function() {
        var service = {};

        var grupos = [
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

        var productosCarrito = [{
            'grupo': 'cereales',
            'nombre': 'Cereales, raíces, tubérculos y plátanos.',
            'alias': 'cereal',
            'productos': [],
        }, {
            'grupo': 'grasas',
            'nombre': 'Grasas.',
            'alias': 'grasas',
            'productos': [],
        }, {
            'grupo': 'frutas',
            'nombre': 'Frutas y verduras.',
            'alias': 'frutas',
            'productos': [],
        }, {
            'grupo': 'azucares',
            'nombre': 'Azucar.',
            'alias': 'azucares',
            'productos': [],
        }, {
            'grupo': 'carnes',
            'nombre': 'Carnes, huevos y leguminosas secas.',
            'alias': 'carnes',
            'productos': [],
        }, {
            'grupo': 'inadecuados',
            'nombre': 'Inadecuados',
            'alias': 'inadecuados',
            'productos': [],
        }, {
            'grupo': 'lacteos',
            'nombre': 'Leches y otros productos lacteos.',
            'alias': 'leche',
            'productos': [],
        }, ]





        /**
         * 
         * @param {type} callback
         * @returns {undefined}
         * NutricompraService.getProductos(function (response){});
         */
        service.getProductos = function(callback) {

            var nutricompra = JSON.parse(localStorage.getItem('nutricompra'));


            if (nutricompra === null) {
                console.log("No Existe");
                var nutricompra = {
                    productosVitrina: obtenerProductosVitrina(),
                    productosCarrito: productosCarrito,
                    cantidadProductosCarrito: 0
                }


                localStorage.setItem("nutricompra", JSON.stringify(nutricompra));
                callback(nutricompra);
            } else {
                console.log("Existe");
                callback(nutricompra);
            }
        };

        /**
         * 
         * @param {type} callback
         * @returns {undefined}
         * NutricompraService.addProductoAlCarrito(grupo, id_producto, function (response){});
         */
        service.addProductoAlCarrito = function(grupo, id_producto, callback) {

            this.getProductos(function(response) {
                var tempProductosCarrito = response.productosCarrito;
                var tempCantidad = response.cantidadProductosCarrito;

                for (a in tempProductosCarrito) {
                    if (tempProductosCarrito[a].alias == grupo) {
                        tempProductosCarrito[a].productos.push(id_producto)
                        tempCantidad++;
                    }
                }




                var nutricompra = {
                    productosVitrina: response.productosVitrina,
                    productosCarrito: tempProductosCarrito,
                    cantidadProductosCarrito: tempCantidad
                }



                localStorage.setItem("nutricompra", JSON.stringify(nutricompra));

                callback();
            });
        };


        /**
         * 
         * @param {type} callback
         * @returns {undefined}
         * NutricompraService.clearProductos(function (response){});
         */
        service.clearProductos = function(callback) {
            console.log("Eliminar información del juego");
            localStorage.removeItem("nutricompra");
            callback();

        };


        function obtenerProductosVitrina() {
            var productos = [];
            var cantidadProductos = 30;

            for (var i = 0; i < cantidadProductos; i++) {
                var grupo = grupos[Math.floor((Math.random() * 7))];

                var numProducto = Math.floor((Math.random() * inventario[grupo]) + 1);;

                var producto = {
                    'grupo': grupo,
                    'id_producto': numProducto,
                    'imagen': 'ico_' + grupo + '_' + numProducto
                }

                productos.push(producto);
            }

            return (productos)
        }

        return service;
    }
]);
