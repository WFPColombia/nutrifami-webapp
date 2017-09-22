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

        var feedbacks = [
            'Incluya productos lácteos en su alimentación diaria para fortalecer sus músculos, huesos y dientes. ',
            'La leche y los derivados lácteos aportan proteína y calcio que el cuerpo necesita; consúmalos diariamente. ',
            'Los cereales, raíces, tubérculos y plátanos dan energía para realizar las actividades diarias. ',
            'Recuerda que una alimentación saludable, debe incluir alimentos de todos los grupos. ',
            'Incluya y varíe alimentos ricos en proteínas como: las carnes, leguminosas y huevo. Estas ayudan a la formación y reparación de los músculos. ',
            'Las carnes, leguminosas y huevos contienen hierro y proteínas, que contribuyen para tener una alimentación saludable.',
            'Las frutas y verduras son indispensables para el cuerpo. Aportan vitaminas, minerales y fibra.',
            'Incluya en su alimentación mínimo cinco porciones de frutas y verduras al día. Prefiera las frutas enteras.',
            'Mantenga una alimentación saludable, utilizando aceite vegetal en cantidad moderada. ',
            'Las grasas vegetales ayudan a que los alimentos absorban y retengan los sabores. Consúmalas en cantidad moderada. ',
            'El azúcar moreno, miel o panela  aportan energía y muy pocos nutrientes. Consúmalos en pequeñas cantidades. ',
            'Consumir alimentos saludables y nutritivos, le ayudan a estar vigoroso  y saludable. ',
            'Los alimentos aportan los nutrientes necesarios para el adecuado funcionamiento del organismo. ',
        ];

        var productosCarrito = [{
            'grupo': 'cereales',
            'nombre': 'Cereales, raíces, tubérculos y plátanos.',
            'alias': 'cereal',
            'porcentaje_recomendado': 27,
            'porcentaje_agregado': 0,
            'productos': [],
        }, {
            'grupo': 'grasas',
            'nombre': 'Grasas.',
            'alias': 'grasas',
            'porcentaje_recomendado': 2,
            'porcentaje_agregado': 0,
            'productos': [],
        }, {
            'grupo': 'frutas',
            'nombre': 'Frutas y verduras.',
            'alias': 'frutas',
            'porcentaje_recomendado': 27,
            'porcentaje_agregado': 0,
            'productos': [],
        }, {
            'grupo': 'azucares',
            'nombre': 'Azucar.',
            'alias': 'azucares',
            'porcentaje_recomendado': 2,
            'porcentaje_agregado': 0,
            'productos': [],
        }, {
            'grupo': 'carnes',
            'nombre': 'Carnes, huevos y leguminosas secas.',
            'alias': 'carnes',
            'porcentaje_recomendado': 19,
            'porcentaje_agregado': 0,
            'productos': [],
        }, {
            'grupo': 'inadecuados',
            'nombre': 'Inadecuados',
            'alias': 'inadecuados',
            'porcentaje_recomendado': 0,
            'porcentaje_agregado': 0,
            'productos': [],
        }, {
            'grupo': 'lacteos',
            'nombre': 'Leches y otros productos lacteos.',
            'alias': 'leche',
            'porcentaje_recomendado': 23,
            'porcentaje_agregado': 0,
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
                var nutricompra = {
                    productosVitrina: obtenerProductosVitrina(),
                    productosCarrito: productosCarrito,
                    cantidadProductosCarrito: 0
                }


                localStorage.setItem("nutricompra", JSON.stringify(nutricompra));
                callback(nutricompra);
            } else {
                callback(nutricompra);
            }
        };

        /**
         * 
         * @param {type} callback
         * @returns {undefined}
         * NutricompraService.addProductoAlCarrito(grupo, id_producto, index, function (response){});
         */
        service.addProductoAlCarrito = function(grupo, id_producto, index, callback) {

            this.getProductos(function(response) {


                var tempProductosCarrito = response.productosCarrito;
                var tempProductosVitrina = response.productosVitrina;
                var tempCantidad = response.cantidadProductosCarrito;
                for (a in tempProductosCarrito) {
                    if (tempProductosCarrito[a].alias == grupo) {
                        tempProducto = {
                            id_producto: id_producto,
                            index: index,
                            left: randomPosition(44, 110) + 'px',
                            top: (randomPosition(0, 10) - 20) + 'px'
                        }

                        tempProductosCarrito[a].productos.push(tempProducto)
                        tempCantidad++;
                        tempProductosVitrina[index].seleccionado = true;


                        var temPorcentaje_agregado = (100 / 15) * tempProductosCarrito[a].productos.length;
                        tempProductosCarrito[a].porcentaje_agregado = temPorcentaje_agregado;


                    }
                }

                var nutricompra = {
                    productosVitrina: tempProductosVitrina,
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
         * NutricompraService.removerProductoAlCarrito(grupo, index, function (response){});
         */
        service.removerProductoAlCarrito = function(grupo, index, callback) {
            this.getProductos(function(response) {
                var tempProductosCarrito = response.productosCarrito;
                var tempProductosVitrina = response.productosVitrina;
                var tempCantidad = response.cantidadProductosCarrito;

                for (a in tempProductosCarrito) {
                    if (tempProductosCarrito[a].alias == grupo) {

                        var tempIndiceVitrina = tempProductosCarrito[a].productos[index].index;

                        console.log(tempIndiceVitrina);
                        tempProductosCarrito[a].productos.splice(index, 1);
                        tempProductosVitrina[tempIndiceVitrina].seleccionado = false;
                        tempCantidad--;

                        var temPorcentaje_agregado = (100 / 15) * tempProductosCarrito[a].productos.length;
                        tempProductosCarrito[a].porcentaje_agregado = temPorcentaje_agregado;

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
         * NutricompraService.getFeedback((response){});
         */
        service.getFeedback = function(callback) {

            this.getProductos(function(response) {

                var alt = Math.floor((Math.random() * feedbacks.length));

                var feedback = {
                    'bandera': 'Regular',
                    'texto1': 'ha sido una compra poco saludable',
                    'feedback': feedbacks[alt]
                }

                var indiceFallo = 0;

                var tempProductosCarrito = response.productosCarrito;
                for (a in tempProductosCarrito) {

                    indiceFallo = indiceFallo + (Math.abs(tempProductosCarrito[a].porcentaje_recomendado - tempProductosCarrito[a].porcentaje_agregado));
                }

                //Convenciones Indice de Falle
                // entre 0 y 40 -> Excelente compra
                // 41 y 70 -> Buena compra
                // mayor a 70 -> Compra Regular

                if (indiceFallo <= 40) {
                    feedback['bandera'] = 'Felicitaciones';
                    feedback['texto1'] = 'ha sido una compra muy saludable';
                } else if (indiceFallo <= 70) {
                    feedback['bandera'] = 'Bien';
                    feedback['texto1'] = 'ha sido una compra saludable';
                }




                callback(feedback);
            });
        };


        /**
         * 
         * @param {type} callback
         * @returns {undefined}
         * NutricompraService.clearProductos(function (response){});
         */
        service.clearProductos = function(callback) {
            localStorage.removeItem("nutricompra");
            callback();

        };


        function obtenerProductosVitrina() {
            var productos = [];
            var cantidadProductos = 90;
            var pagina = 1;

            for (var i = 0; i < cantidadProductos; i++) {
                var grupo = grupos[Math.floor((Math.random() * 7))];

                var numProducto = Math.floor((Math.random() * inventario[grupo]) + 1);;

                var producto = {
                    'grupo': grupo,
                    'id_producto': numProducto,
                    'imagen': 'ico_' + grupo + '_' + numProducto,
                    'seleccionado': false,
                    'pagina': pagina
                }

                productos.push(producto);

                if ((i + 1) % 30 == 0) {
                    pagina++;
                }


            }

            return (productos)
        }

        function randomPosition(min, max) {
            var pos = Math.floor((Math.random() * max) + min);

            if (pos > max) {
                pos = max

            }

            return pos;
        };

        return service;
    }
]);
