nutrifamiApp.factory('ComprasService', ['$http', '$cookieStore', '$rootScope', '$timeout',
    function() {
        var service = {};

        var nombreUsuario = '';

        var feedbacks = {
            '1': {
                'exceso': [
                    '¡Hola ______! vemos que en la última compra la mayoría de alimentos que llevó pertenecen a este grupo. Para tener una adecuada alimentación, le recomendamos que la próxima vez lleve frutas y verduras de la  temporada, así como lácteos, leguminosas y alimentos de los otros grupos,  disponibles en el punto de venta.',
                    ' ¡Hola ______!, ¿No cree  que está llevando muchos alimentos del grupo de cereales, raíces, tubérculos y plátanos? Recuerde que una alimentación saludable debe ser variada. Puede llevar otros alimentos como frutas, verduras, carnes, huevos, leguminosas y lácteos, disponibles en el punto de venta.'
                ],
                'bien': [
                    '¡Muy bien ______!, los alimentos de este grupo brindan la energía que necesitamos cada día.',
                    'Está llevando la cantidad adecuada de alimentos de este grupo. Recuerde llevar también alimentos de los otros grupos para tener una alimentación saludable.',
                    '¡Bien Hecho ______! Está (comprando) redimiendo  una adecuada cantidad de alimentos de este grupo, continúe así.'
                ],
                'bajo': [
                    '______, recuerde que los cereales, raíces, tubérculos nos brindan la energía que necesitamos cada día.',
                    'Recuerde que una alimentación saludable debe incluir alimentos de todos los grupos.'
                ]
            },

            '2': {
                'exceso': [
                    '______, recuerde acompañar la redención de carnes, huevos y leguminosas con frutas y verduras para tener una alimentación variada y saludable.',
                    ' ¡Muy bien ______!, los alimentos de este grupo brindan la proteína necesaria para el mantenimiento de los músculos.',
                    ' Recuerda que es bueno consumir dos veces por semana leguminosas, que además de ser muy nutritivas se consiguen a buen precio, son fáciles de conservar y rinden bastante.'
                ],
                'bien': [
                    '¡Perfecto ______! Está comprando suficientes alimentos ricos en proteína. Recuerde llevar frutas, verduras y cereales para tener una alimentación variada y saludable.',
                    ' ¡Está aprendiendo a comer saludable! Recuerde que las carnes, los huevos y los granos son fuente de proteína.',
                    'Lo está haciendo bien ______. Recuerde que para mejorar la alimentación de la familia,  se deben consumir al menos dos veces por semana leguminosas y  una vez a la semana vísceras, como hígado y pajarilla.'
                ],
                'bajo': [
                    '¡Atención ______! Hemos visto que no está redimiendo suficientes alimentos como carnes, huevos y leguminosas (frijol, lenteja, etc.). Recuerde incluir estos alimentos en la próxima redención.',
                    '______, si está redimiendo poco en carnes porque no alcanza el dinero, recuerde que puede llevar lentejas, garbanzos, fríjoles, huevos o cereales como el arroz o maíz para hacer combinaciones nutritivas.',
                    '______ incluya vísceras (hígado, pajarilla, riñón, pulmón) en el mercado; contienen una adecuada cantidad de hierro y proteína, que complementan la alimentación.'
                ]
            },

            '3': {
                'exceso': [
                    '¡Muy bien ______!, está redimiendo suficiente leche y productos lácteos. Recuerde almacenarlos en un lugar fresco y taparlos para que duren más y complementen la alimentación con alimentos de los otros grupos.',
                    '______ para variar las preparaciones puede preparar coladas, muy nutritivas para los adultos y los niños, agreguéle yogur a la fruta, haga el chocolate en leche o los jugos de frutas con leche.',
                    'Además de leche, puede llevar yogur, cuajada o queso; estos alimentos también son excelente fuente de proteína y calcio, es muy importante que la familia los consuma a diario.'
                ],
                'bien': [
                    '¡Excelente elección  ______! La leche y productos lácteos además de ser muy ricos en proteína, también brindan calcio que ayuda a mantener huesos, músculos y dientes fuertes.',
                    '¡Bien ______! Está usando el bono para llevar una adecuada cantidad de leche y productos lácteos que sirven para mantener huesos y dientes saludables.',
                    '¡Siga así ______! consumir todos los días por lo menos 2 porciones de leche o productos lácteos ayuda a fortalecer los huesos y a prevenir la debilidad de estos en las personas mayores.',
                    '¡Lo está haciendo bien ______! Consumir mínimo dos vasos de leche o derivados lácteos diariamente garantiza huesos, músculos y dientes fuertes.'

                ],
                'bajo': [
                    '¡Cuidado ______! Hemos visto que no está llevando suficiente cantidad de leche y productos lácteos. Es muy importante que si no los consigue por otros medios, utilice el bono para adquirirlos en el punto de venta.',
                    '______ está llevando muy poca leche y derivados lácteos como yogur y queso. Sí no los consigue por otros medios, recuerde que estos alimentos son muy importantes porque aportan una adecuada cantidad de proteína y calcio.',
                    '______  es muy  importante que consuma al menos dos porciones de leche o productos lácteos al día, si no los consigue fácilmente, puede aprovechar el bono y llevar los que estén disponibles en el punto de venta.',

                ]
            },
            '4': {
                'exceso': [
                    '¡Muy bien ______!, está redimiendo una adecuada cantidad de frutas y verduras. Debe almacenarlas en un sitio fresco y aireado, protegidas de insectos para que no se dañen y las pueda disfrutar por más tiempo.',
                    '¡Excelente! está redimiendo una cantidad adecuada de  frutas y verduras, recuerde consumir primero las más maduras para que no se dañen.',
                    '¡Lo está haciendo bien ______!, es importante que todos los días la familia consuma 5 porciones entre frutas y verduras. ',
                    '¡Muy bien! Recuerde que es mejor consumir las frutas enteras y las verduras crudas porque brindan más fibra y vitaminas. No olvide almacenarlas en un lugar fresco y consumir primero las maduras.'

                ],
                'bien': [
                    '¡Muy bien ______!, está llevando una adecuada cantidad de frutas y verduras, que contribuyen a una alimentación variada y saludable.',
                    'Excelente, siga llevando frutas y verduras ______. ¡Complemente la alimentación con cereales, lácteos, huevos, carne o leguminosas para tener una alimentación variada, saludable y nutritiva.',
                    '¡Una compra muy saludable ______!, las frutas y verduras son muy importantes en la alimentación y se deben consumir 5 porciones diariamente.',

                ],
                'bajo': [
                    '¡Hola ______!, no olvide comprar frutas y verduras, aportan nutrientes importantes que otros alimentos no tienen. Pregunte en el punto de venta cuales están en cosecha o en oferta y aprovéchelas!',
                    '¡Hola ______!, ¿No cree que está llevando pocas frutas y verduras? Recuerde que en ellas encuentra vitaminas y minerales necesarios para estar saludables.',
                    '¡Atención ______! Hemos visto que no está redimiendo suficiente cantidad de frutas y verduras. Utilice el bono para comprarlas en el punto de venta.'

                ]
            },

            '5': {
                'exceso': [
                    'Cuidado ______, está llevando muchos productos del grupo de las grasas. Recuerde consumir alimentos de todos los grupos en una cantidad adecuada para lograr una alimentación más variada y saludable.',
                    '______ prefiera utilizar aceites vegetales en las  preparaciones; evite consumir alimentos fritos, puede variar las  preparaciones haciéndolas asadas, cocidas o al vapor.',
                    '______ recuerde controlar la cantidad de grasa que usa para las preparaciones. Al momento de la redención, prefiera llevar aceite vegetal en vez de manteca, mantequilla, o margarina.'

                ],
                'bien': [
                    '______, está llevando una cantidad adecuada de productos del grupo de grasas; recuerde que su consumo debe ser moderado para lograr una alimentación saludable.',
                    '¡ Muy bien! ______, recuerde siempre moderar la cantidad de grasa que utiliza para preparar los alimentos, e incluir alimentos de todos los grupos para lograr una alimentación variada y saludable.',
                    '______, para dar variedad a las comidas y lograr una alimentación saludable, prepare los alimentos asados, guisados, al vapor. Evite hacerlos fritos.'

                ],
                'bajo': [
                    'Recuerde que una alimentación saludable debe incluir alimentos de todos los  grupos: (Anexar imagen Plato Saludable)'

                ]
            },

            '6': {
                'exceso': [
                    ''
                ],
                'bien': [
                    ''
                ],
                'bajo': [
                    ''
                ]
            }
        };



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
            nombreUsuario = usuario.nombre;
            this.getConsolidadoCompras(usuario, function(response) {
                if (response.success) {
                    if (Object.keys(response.data).length > 0) {
                        response.puntoVenta = response.data.punto_venta_id;
                        var consumoUltimoMes = ordenarGrupos(getLast(getLast(response.data.redencion)));
                        for (var i in consumoUltimoMes) {
                            consumoUltimoMes[i].porcentaje_visual = calcularPorcentajeVisual(consumoUltimoMes[i].porcentaje_compra, consumoUltimoMes[i].porcentaje_recomendado);
                            if (consumoUltimoMes[i].porcentaje_visual >= 65 && consumoUltimoMes[i].porcentaje_visual <= 95) {
                                consumoUltimoMes[i].carita = 'feliz';
                            } else if (consumoUltimoMes[i].porcentaje_visual < 65) {
                                consumoUltimoMes[i].feedback = seleccionarFeedbackAleatorio(consumoUltimoMes[i].grupo_id, 'bajo');

                            } else {
                                consumoUltimoMes[i].feedback = seleccionarFeedbackAleatorio(consumoUltimoMes[i].grupo_id, 'exceso');

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
                'carita': 'triste',
                'feedback': seleccionarFeedbackAleatorio('1', 'bien')

            }, {
                'nombre': "Carnes, huevos y leguminosas secas.",
                'grupo_id': '2',
                'porcentaje_recomendado': 19,
                'porcentaje_compra': 0,
                'carita': 'triste',
                'feedback': seleccionarFeedbackAleatorio('1', 'bien')

            }, {
                'nombre': "Leches y otros productos lacteos.",
                'grupo_id': '3',
                'porcentaje_recomendado': 23,
                'porcentaje_compra': 0,
                'carita': 'triste',
                'feedback': seleccionarFeedbackAleatorio('1', 'bien')
            }, {
                'nombre': "Frutas y verduras.",
                'grupo_id': '4',
                'porcentaje_recomendado': 27,
                'porcentaje_compra': 0,
                'carita': 'triste',
                'feedback': seleccionarFeedbackAleatorio('1', 'bien')
            }, {
                'nombre': "Grasas.",
                'grupo_id': '5',
                'porcentaje_recomendado': 2,
                'porcentaje_compra': 0,
                'carita': 'triste',
                'feedback': seleccionarFeedbackAleatorio('1', 'bien')
            }, {
                'nombre': "Azucar.",
                'grupo_id': '6',
                'porcentaje_recomendado': 2,
                'porcentaje_compra': 0,
                'carita': 'triste',
                'feedback': seleccionarFeedbackAleatorio('1', 'bien')
            }];

            indice = 0;

            for (var i = 1; i <= 8; i++) {

                if (typeof myObj.grupo[i] !== 'undefined') {
                    if (i == 4) {
                        grupos[1].porcentaje_compra = grupos[1].porcentaje_compra + parseFloat(myObj.grupo[i].porcentaje_compra);
                        grupos[1].compra = grupos[1].compra.concat(myObj.grupo[i].compra);
                    } else if (i == 6) {
                        grupos[3].porcentaje_compra = grupos[3].porcentaje_compra + parseFloat(myObj.grupo[i].porcentaje_compra);
                        grupos[3].compra = grupos[3].compra.concat(myObj.grupo[i].compra);

                    } else {
                        grupos[indice].porcentaje_compra = parseFloat(myObj.grupo[i].porcentaje_compra);
                        grupos[indice].compra = myObj.grupo[i].compra;
                        indice++;
                    }
                }
            }

            //Calcular totales:


            for (var i in grupos) {
                var totalCompra = 0;
                for (var j in grupos[i].compra) {
                    totalCompra = totalCompra + parseInt(grupos[i].compra[j].total);
                }
                grupos[i].totalCompra = totalCompra;
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
                        ordenados[3].productos = ordenados[3].productos.concat(myObj[i].productos);
                    } else {
                        ordenados[indice].productos = myObj[i].productos;
                        indice++;
                    }
                }
            }

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

        function seleccionarFeedbackAleatorio(grupo, estado) {

            var alt = Math.floor((Math.random() * feedbacks[grupo][estado].length));
            var fb = feedbacks[grupo][estado][alt];

            return fb.replace("______", nombreUsuario);
        }

        return service;
    }
]);
