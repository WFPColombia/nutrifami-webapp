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
                            consumoUltimoMes[i].porcentaje_visual = calcularPorcentaje(consumoUltimoMes[i].porcentaje_compra, consumoUltimoMes[i].porcentaje_recomendado);
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
            console.log(puntoVenta);
            var miPuntoVenta = JSON.parse(localStorage.getItem('puntoVenta'));
            if (miPuntoVenta === null) {
                nutrifami.consumo.getProductosPuntoVenta(puntoVenta, function(response) {
                    localStorage.setItem("puntoVenta", JSON.stringify(response.data));
                    callback(response);
                });
            } else {
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
            var consumoOrganizado = [];
            for (var i = 1; i <= 9; i++) {
                for (var j in myObj.grupo) {
                    if (myObj.grupo[j].grupo_id == i) {
                        consumoOrganizado.push(myObj.grupo[j]);
                    }
                }
            }
            return (consumoOrganizado);
        }

        function calcularPorcentaje(valor, maximo) {
            if (maximo === 0) {
                maximo = 0.1;
            }
            var porcentaje = parseInt((100 / maximo) * valor);
            if (porcentaje > 100) {
                porcentaje = 100;
            }
            return porcentaje;
        }

        return service;
    }
]);
