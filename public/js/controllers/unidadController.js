/*global angular*/
nutrifamiApp.controller('UnidadController', function($scope, $location, $routeParams, $anchorScroll, $timeout, $uibModal, ngAudio, bsLoadingOverlayService, UsuarioService, CapacitacionService) {
    'use strict';

    $anchorScroll();
    //nutrifami.training.initClient();


    /* Overloading*/
    bsLoadingOverlayService.start();
    /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
    $scope.$on('$viewContentLoaded', function() {
        bsLoadingOverlayService.stop();
    });

    $scope.textoBoton = 'Calificar';


    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    $scope.estadoUnidad = 'espera';

    try {
        $scope.unidad = CapacitacionService.getUnidad($routeParams.leccion, $routeParams.unidad);
        $scope.unidad.numeroUnidad = $routeParams.unidad;
        $scope.unidad.totalUnidades = CapacitacionService.getUnidadesActivas($routeParams.leccion).length;

        var tempOpciones = []; //Arreglo para almacenar las opciones


        /* Validamos si la unidad actual es de parejas o de otra 
         * if - Si es parejas ponemos las imagenes de primeras y los textos abajo
         * else - Si es otro tipo de unidad, desorganizamos las opciones */
        if ($scope.unidad.tipo.id == 2) {
            var tempOpcionesPareja = []; //Arreglo para almacenar las parejas de las opciones 
            var tempLote1 = 0;
            var tempLote2 = 0;
            // Recorre todo el objeto de las opciones para crear el arreglo
            var i = 1;
            while (i <= Object.keys($scope.unidad.opciones).length / 2) {

                for (var j in $scope.unidad.opciones) {
                    if ($scope.unidad.opciones[j].orden == i) {
                        if (tempLote1 == 0) {
                            tempLote1 = $scope.unidad.opciones[j];
                        } else {
                            tempLote2 = $scope.unidad.opciones[j];
                        }
                    }
                }

                // Si la opción tiene un texto corto se alamacena en las opciones, 
                if (tempLote1.texto.length > tempLote2.texto.length) {
                    tempOpciones.push(tempLote1);
                    tempOpcionesPareja.push(tempLote2);

                } else { // Si no, se almacena en la pareja
                    tempOpciones.push(tempLote2);
                    tempOpcionesPareja.push(tempLote1);

                }
                tempLote1 = 0;
                tempLote2 = 0;
                i++;
            }

            /* Se mezclan los arreglos */
            shuffle(tempOpcionesPareja);
            shuffle(tempOpciones);
            $scope.unidad.opciones = tempOpcionesPareja.concat(tempOpciones); /* Se concatenan los arreglos, con las imagenes primero y las opciones despues */
        } else {
            for (var i in $scope.unidad.opciones) {
                tempOpciones.push($scope.unidad.opciones[i]);
            }
            shuffle(tempOpciones);
            $scope.unidad.opciones = tempOpciones;

            if ($scope.unidad.tipo.id == 1) {
                $timeout(function() {
                    $scope.botonCalificar = true;
                    $scope.textoBoton = 'continuar';
                }, 10000);

            }
        }

        /*Verifica si la unidad tienen audio y lo carga*/
        if (typeof $scope.unidad.audio !== 'undefined') {
            $scope.unidad.audio.audio = ngAudio.load($scope.unidad.audio.url);
        }

        if (typeof $scope.unidad.instruccion.audio !== 'undefined') {
            $scope.unidad.instruccion.audio.audio = ngAudio.load($scope.unidad.instruccion.audio.url);

            $scope.unidad.instruccion.audio.audio.play();

            $scope.unidad.instruccion.audio.audio.complete(function() {
                $scope.unidad.instruccion.audio.audio.stop();
                $scope.unidad.audio.audio.play();
                $scope.unidad.audio.audio.complete(function() {
                    $scope.unidad.audio.audio.stop();
                })
            });

        }

        $scope.unidad.feedback = [];

        console.log($scope.unidad.opciones);

    } catch (err) {
        $location.path('/capacitacion');
    }


    // Obtenemos la cantidad de respuestas correctas
    var respuestasCorrectas = 0;
    var respuestasSeleccionadas = 0;
    for (var i in $scope.unidad.opciones) {
        if ($scope.unidad.opciones[i].correcta == 1) {
            respuestasCorrectas++;
        }
        $scope.unidad.opciones[i].selected = false;
        $scope.unidad.opciones[i].evaluacion = false;
        $scope.unidad.opciones[i].pareja = '';
        $scope.unidad.opciones[i].match = false;

        /*Verifica si la opcion tienen audio y lo carga*/
        if (typeof $scope.unidad.opciones[i].audio !== 'undefined') {
            $scope.unidad.opciones[i].audio.audio = ngAudio.load($scope.unidad.opciones[i].audio.url);
        }
    }



    $scope.botonCalificar = false;

    $scope.seleccionarOpcion = function(index) {
        if ($scope.unidad.opciones[index].selected) {
            $scope.unidad.opciones[index].selected = false;
            respuestasSeleccionadas--;
        } else {
            $scope.unidad.opciones[index].selected = true;
            respuestasSeleccionadas++;
        }

        if (respuestasCorrectas === 1) {
            for (var i in $scope.unidad.opciones) {
                if (i !== index) {
                    if ($scope.unidad.opciones[i].selected) {
                        $scope.unidad.opciones[i].selected = false;
                        $scope.unidad.opciones[i].evaluacion = false;
                        respuestasSeleccionadas--;
                    }
                }
            }
        }

        if (respuestasSeleccionadas === respuestasCorrectas) {
            $scope.botonCalificar = true;
        } else {
            $scope.botonCalificar = false;
        }
    };

    var parejasContador = 0;
    var pareja1Orden = 0;
    var pareja2Orden = 0;
    var pareja1Pos = 0;
    var pareja2Pos = 0;
    var parejasCorrectas = 0;

    $scope.seleccionarPareja = function(index) {
        /* Verifica si es una opcion que no ha hecho match para poderla seleccionar*/
        if (!$scope.unidad.opciones[index].match) {

            for (var i in $scope.unidad.opciones) {
                $scope.unidad.opciones[i].fallo = false;
            }

            /* Toggle para seleccionar y deseleccionar tarjeta*/
            if ($scope.unidad.opciones[index].selected) {
                $scope.unidad.opciones[index].selected = false;
                /*Si se deselecciona la carta se resta del contador*/
                parejasContador--;
            } else {
                $scope.unidad.opciones[index].selected = true;
                /*Almacenar la respuesta correcta para validar más adelante si es una pareja*/

                parejasContador++;
                if (parejasContador === 1) {
                    pareja1Orden = $scope.unidad.opciones[index].orden;
                    pareja1Pos = index;
                } else if (parejasContador === 2) {
                    pareja2Orden = $scope.unidad.opciones[index].orden;
                    pareja2Pos = index;

                    if (pareja1Orden === pareja2Orden) {
                        /*Estilos para la pareja actual*/
                        $scope.unidad.opciones[pareja2Pos].pareja = 'pareja-' + pareja2Orden;
                        $scope.unidad.opciones[pareja2Pos].selected = false;
                        $scope.unidad.opciones[pareja2Pos].match = true;

                        /*Estilos para pareja anterior*/
                        $scope.unidad.opciones[pareja1Pos].pareja = 'pareja-' + pareja2Orden;
                        $scope.unidad.opciones[pareja1Pos].selected = false;
                        $scope.unidad.opciones[pareja1Pos].match = true;

                        parejasContador = 0;
                        pareja1Pos = 0;
                        pareja2Pos = 0;
                        pareja1Orden = 0;
                        pareja2Orden = 0;

                        parejasCorrectas++;
                        if (parejasCorrectas == ($scope.unidad.opciones.length / 2)) {
                            /*Si las parejas correctas es igual a la mitad de la cantidad de opciones habilitar el botón de continuar*/
                            $scope.estadoUnidad = 'acierto';
                            $scope.feedback();
                        }

                    } else {
                        $scope.unidad.opciones[pareja2Pos].pareja = '';
                        $scope.unidad.opciones[pareja2Pos].selected = false;
                        $scope.unidad.opciones[pareja2Pos].match = false;
                        $scope.unidad.opciones[pareja2Pos].fallo = true;
                        $scope.unidad.opciones[pareja1Pos].pareja = '';
                        $scope.unidad.opciones[pareja1Pos].selected = false;
                        $scope.unidad.opciones[pareja1Pos].match = false;
                        $scope.unidad.opciones[pareja1Pos].fallo = true;
                        parejasContador = 0;
                        pareja1Pos = 0;
                        pareja2Pos = 0;
                        pareja1Orden = 0;
                        pareja2Orden = 0;

                    }
                }
            }

        }
    };

    $scope.calificarUnidad = function() {
        /* Validar si acerto o fallo*/

        if ($scope.unidad.tipo.id == 1) {
            $scope.irASiguienteUnidad();
            return;
        }


        var tempFeedbackBien = [];
        var tempFeedbackMal = [];

        var respuestasAcertadas = 0;
        for (var i in $scope.unidad.opciones) {
            if ($scope.unidad.opciones[i].selected) {
                $scope.unidad.opciones[i].evaluacion = true;
                if ($scope.unidad.opciones[i].selected == $scope.unidad.opciones[i].correcta) {
                    respuestasAcertadas++;


                    if (typeof $scope.unidad.opciones[i].feedback.audio !== 'undefined') {
                        $scope.unidad.opciones[i].feedback.audio.audio = ngAudio.load($scope.unidad.opciones[i].feedback.audio.url);
                    }
                    tempFeedbackBien.push($scope.unidad.opciones[i].feedback);
                } else {
                    /* Almacena la respuesta incorrecta */
                    if (typeof $scope.unidad.opciones[i].feedback.audio !== 'undefined') {
                        $scope.unidad.opciones[i].feedback.audio.audio = ngAudio.load($scope.unidad.opciones[i].feedback.audio.url);
                    }
                    tempFeedbackMal.push($scope.unidad.opciones[i].feedback);
                }
            }
        }
        if (respuestasAcertadas === respuestasCorrectas) {
            $scope.estadoUnidad = 'acierto';
            $scope.unidad.feedback = filtrarFeedback(tempFeedbackBien);
        } else {
            $scope.estadoUnidad = 'fallo';
            $scope.unidad.feedback = tempFeedbackMal;
        }

        $scope.unidad.feedback[0].audio.audio.play();

        $scope.feedback();
    };

    $scope.feedback = function() {
        var data = {
            estado: $scope.estadoUnidad,
            feedback: $scope.unidad.feedback
        };

        var feedbackModal = $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/feedbackUnidad.modal.html',
            controller: 'FeedbackUnidadModalController',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                data: function() {
                    return data;
                }
            }
        });

        feedbackModal.result.then(function(estado) {
            if (estado === 'acierto') {
                $scope.irASiguienteUnidad();
            } else {
                $scope.reiniciarUnidad();
            }
        });
    };

    $scope.irASiguienteUnidad = function() {
        $scope.siguienteUnidad = parseInt($routeParams.unidad) + 1;
        if ($scope.siguienteUnidad > $scope.unidad.totalUnidades) {
            var usuarioAvance = UsuarioService.getUsuarioAvance();
            if (typeof usuarioAvance['3'] === 'undefined') {
                usuarioAvance['3'] = {};
                usuarioAvance['3'][$routeParams.modulo] = {};
            }
            if (typeof usuarioAvance['3'][$routeParams.modulo] === 'undefined') {
                usuarioAvance['3'][$routeParams.modulo] = {};
            }
            usuarioAvance['3'][$routeParams.modulo][$routeParams.leccion] = "true";

            var data = {
                'per_id': $scope.usuarioActivo.id,
                'cap_id': 3,
                'mod_id': $routeParams.modulo,
                'lec_id': $routeParams.leccion
            };

            UsuarioService.setUsuarioAvance(usuarioAvance, data, function(response) {
                if (response.success) {
                    $location.path('/m/' + $routeParams.modulo + "/" + $routeParams.leccion + "/" + $routeParams.unidad + "/leccion-terminada");
                }
            });

        } else {
            $location.path('/m/' + $routeParams.modulo + "/" + $routeParams.leccion + "/" + $scope.siguienteUnidad);
        }
    };

    $scope.reiniciarUnidad = function() {
        for (var i in $scope.unidad.opciones) {
            $scope.unidad.opciones[i].selected = false;
            $scope.unidad.opciones[i].evaluacion = false;
            respuestasSeleccionadas = 0;
        }
        $scope.estadoUnidad = 'espera';
        $scope.botonCalificar = false;
    };

    /**
     * Shuffles array in place.
     * @param {Array} a items The array containing the items.
     */
    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    function filtrarFeedback(a) {
        return a.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        })
    }
});

nutrifamiApp.directive('opcionesUnidadInfo', function() {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            colspan: '=',
            index: '@'
        },
        templateUrl: 'views/directives/opcionesUnidadInfo.html',
        link: function($scope, $element, $attrs) {
            $scope.click = function() {
                $scope.$parent.seleccionarOpcion($scope.index);
            };
        }
    };
});

nutrifamiApp.directive('parejasUnidadInfo', function() {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            index: '@'
        },
        templateUrl: 'views/directives/parejasUnidadInfo.html',
        link: function($scope, $element, $attrs) {
            $scope.click = function() {
                $scope.$parent.seleccionarPareja($scope.index);
            };
        }
    };
});

nutrifamiApp.directive('reiniciarUnidad', function() {
    return {
        restrict: 'E',
        scope: {
            feedback: '='
        },
        templateUrl: 'views/directives/reiniciarUnidad.html',
        link: function($scope, $element, $attrs) {
            $scope.reiniciar = function() {
                $scope.$parent.reiniciarUnidad();
            };
        }
    };
});

nutrifamiApp.directive('siguienteUnidad', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'views/directives/siguienteUnidad.html',
        link: function($scope, $element, $attrs) {
            $scope.siguienteUnidad = function() {
                $scope.$parent.irASiguienteUnidad();
            };
        }
    };
});
