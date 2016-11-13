nutrifamiApp.factory('ComprasService', ['$http', '$cookieStore', '$rootScope', '$timeout',
    function() {
        var service = {};

        /**
         * 
         * @param {type} usuario
         * @param {type} callback
         * @returns {undefined}
         * ComprasService.getConsolidadoCompras(usuario, function (response){});
         */
        service.getConsolidadoCompras = function(usuario, callback) {
            var misCompras = JSON.parse(localStorage.getItem('misCompras'));


            if (misCompras === null) {
                nutrifami.consumo.getConsolidadoCompras(usuario, function(response) {
                    localStorage.setItem("misCompras", JSON.stringify(response.data));
                    callback(response);
                });
            } else {
                var response = {
                    success: true,
                    data: misCompras
                };
                callback(response);
            }
        };

        /**
         * 
         * @param {type} usuario
         * @param {type} callback
         * @returns {undefined}
         * 
         * ComprasService.getConsolidadoComprasUltimoMes(usuario,function(response){});
         * 
         */
        service.getConsolidadoComprasUltimoMes = function(usuario, callback) {
            this.getConsolidadoCompras(usuario, function(response) {
                if (response.success) {
                    if (Object.keys(response.data).length > 0) {
                        response.puntoVenta = response.data.punto_venta_id;
                        var consumoUltimoMes = ordenarGrupos(getLast(getLast(response.data.redencion)));
                        for (var i in consumoUltimoMes) {
                            consumoUltimoMes[i].porcentaje_visual = calcularPorcentajeVisual(consumoUltimoMes[i].porcentaje_compra, consumoUltimoMes[i].porcentaje_recomendado);
                            if (consumoUltimoMes[i].porcentaje_visual >= 65 && consumoUltimoMes[i].porcentaje_visual <= 95) {
                                consumoUltimoMes[i].carita = 'feliz';
                            }
                        }
                        response.data = consumoUltimoMes;
                    } else {
                        response.success = false;
                        response.mensaje = "No hay datos";
                    }
                }
                callback(response);
            });
        };

        service.getConsolidadoComprasUltimoMesByGroup = function(usuario, grupo_id, callback) {
            this.getConsolidadoComprasUltimoMes(usuario, function(response) {
                var response2 = response;
                var dataBygroup = {};
                if (response.success) {
                    for (var i in response.data) {
                        if (response.data[i].grupo_id == grupo_id) {
                            dataBygroup = response.data[i]
                        }
                    }
                    response2.data = dataBygroup;
                    response2.tienda = response.puntoVenta;
                }
                callback(response2);
            });
        };

        /**
         * 
         * @param {type} puntoVenta
         * @param {type} callback
         * @returns {undefined}
         * ComprasService.getProductosPuntoVenta(puntoVenta, function (response){});
         */
        service.getProductosPuntoVenta = function(puntoVenta, callback) {
            var miPuntoVenta = JSON.parse(localStorage.getItem('puntoVenta'));
            if (miPuntoVenta === null) {
                nutrifami.consumo.getProductosPuntoVenta(puntoVenta, function(response) {
                    response.data = ordenarRecomendados(response.data);
                    localStorage.setItem("puntoVenta", JSON.stringify(response.data));
                    callback(response);
                });
            } else {
                miPuntoVenta = ordenarRecomendados(miPuntoVenta);
                var response = {
                    success: true,
                    data: miPuntoVenta
                };
                callback(response);
            }
        };

        service.getProductosPuntoVentaByGroup = function(puntoVenta, grupo_id, callback) {
            this.getProductosPuntoVenta(puntoVenta, function(response) {
                var response2 = response;
                var dataBygroup = {};
                if (response.success) {
                    for (var i in response.data) {
                        if (response.data[i].grupo_id == grupo_id) {
                            dataBygroup = response.data[i]
                        }
                    }
                    response2.data = dataBygroup;
                }
                callback(response2);
            });
        };

        function getLast(myObj) {
            var keys = [];
            for (var k in myObj) {
                if (myObj.hasOwnProperty(k)) {
                    keys.push(myObj[k]);
                }
            }
            keys.sort(); /*Organiza el arreglo*/
            keys.reverse(); /*Lo invierte para obtener el ultimo*/
            return keys[0];
        }

        function ordenarGrupos(myObj) {

            //[0]1 Cereales, raíces, tubérculos y plátanos
            //[1]2 Carnes, huevos y leguminosas secas. (2 y 4)
            //3 Leches y otros productos lacteos
            //5 Frutas y verduras
            //7 Grasas
            //8 Azucar
            //9 Otros

            var grupos = [{
                'nombre': "Cereales, raíces, tubérculos y plátanos.",
                'grupo_id': '1',
                'porcentaje_recomendado': 27,
                'porcentaje_compra': 0,
                'carita': 'triste'
            }, {
                'nombre': "Carnes, huevos y leguminosas secas.",
                'grupo_id': '2',
                'porcentaje_recomendado': 19,
                'porcentaje_compra': 0,
                'carita': 'triste'

            }, {
                'nombre': "Leches y otros productos lacteos.",
                'grupo_id': '3',
                'porcentaje_recomendado': 23,
                'porcentaje_compra': 0,
                'carita': 'triste'
            }, {
                'nombre': "Frutas y verduras.",
                'grupo_id': '4',
                'porcentaje_recomendado': 27,
                'porcentaje_compra': 0,
                'carita': 'triste'
            }, {
                'nombre': "Grasas.",
                'grupo_id': '5',
                'porcentaje_recomendado': 2,
                'porcentaje_compra': 0,
                'carita': 'triste'
            }, {
                'nombre': "Azucar.",
                'grupo_id': '6',
                'porcentaje_recomendado': 2,
                'porcentaje_compra': 0,
                'carita': 'triste'
            }];


            indice = 0;

            for (var i = 1; i <= 8; i++) {

                if (typeof myObj.grupo[i] !== 'undefined') {
                    if (i == 4) {
                        grupos[1].porcentaje_compra = grupos[1].porcentaje_compra + parseFloat(myObj.grupo[i].porcentaje_compra);
                    } else if (i == 6) {
                        grupos[4].porcentaje_compra = grupos[4].porcentaje_compra + parseFloat(myObj.grupo[i].porcentaje_compra);
                    } else {
                        grupos[indice].porcentaje_compra = parseFloat(myObj.grupo[i].porcentaje_compra);
                        indice++;
                    }
                }
            }
            return (grupos);
        }

        function ordenarRecomendados(myObj) {

            var ordenados = [{
                'nombre': "Cereales, raíces, tubérculos y plátanos.",
                'grupo_id': '1',
                'productos': []
            }, {
                'nombre': "Carnes, huevos y leguminosas secas.",
                'grupo_id': '2',
                'productos': []

            }, {
                'nombre': "Leches y otros productos lacteos.",
                'grupo_id': '3',
                'productos': []
            }, {
                'nombre': "Frutas y verduras.",
                'grupo_id': '4',
                'productos': []
            }, {
                'nombre': "Grasas.",
                'grupo_id': '5',
                'productos': []
            }, {
                'nombre': "Azucar.",
                'grupo_id': '6',
                'productos': []
            }];


            indice = 0;

            for (var i = 1; i <= 8; i++) {
                if (typeof myObj[i] !== 'undefined') {
                    if (i == 4) {
                        ordenados[1].productos = ordenados[1].productos.concat(myObj[i].productos);
                    } else if (i == 6) {
                        ordenados[4].productos = ordenados[4].productos.concat(myObj[i].productos);
                    } else {
                        ordenados[indice].productos = myObj[i].productos;


                        indice++;
                    }
                }
            }

            console.log(ordenados);


            for (var i in ordenados) {
                ordenados[i].productos = eliminarRepitidos(ordenados[i].productos, "codigo");
                ordenados[i].productos = seleccionarMasBaratos(ordenados[i].productos, 5);

            }

            return (ordenados);
        }

        function calcularPorcentajeVisual(valor, maximo) {
            var porcentaje = parseInt((100 / maximo) * valor); //Calcula el porcentaje  con respecto al porcentaje ideal
            var porcentaje_visual = porcentaje * 0.8;

            if (porcentaje_visual > 100) {
                porcentaje_visual = 100;
            }
            return parseInt(porcentaje_visual);
        }

        function dynamicSort(property) {
            var sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function(a, b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }

        function eliminarRepitidos(myList, reference) {
            myList.sort(dynamicSort(reference));

            var tempList = [];
            tempList.push(myList[0]);
            for (var i = 1; i < myList.length; i++) {
                if (myList[i][reference] != myList[i - 1][reference]) {
                    tempList.push(myList[i]);
                }
            }
            return tempList
        }

        function seleccionarMasBaratos(myList, cantidad) {

            for (var i in myList) {

                if (myList[i]) {
                    myList[i].precio = parseFloat(myList[i].precio)
                } else {
                    myList[i] = {
                        nombre: 'No hay productos de este grupo en esta tienda',
                        precio: 0
                    };
                }
                myList.sort(dynamicSort('precio'));
            }

            myList = myList.slice(0, cantidad); // Elige los cinco más baratos

            return myList;

        }

        return service;
    }
]);
