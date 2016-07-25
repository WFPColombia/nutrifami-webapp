/*global angular*/
nutrifamiApp.controller('UnidadController', ['$scope', '$location', '$routeParams', '$anchorScroll', 'ngAudio', 'bsLoadingOverlayService', '$timeout', '$uibModal', '$log', function ($scope, $location, $routeParams, $anchorScroll, ngAudio, bsLoadingOverlayService, $timeout, $uibModal, $log) {
        'use strict';
        $anchorScroll();

        /* Overloading*/
        bsLoadingOverlayService.start();
        /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
        $scope.$on('$viewContentLoaded', function () {
            /* Se le agrega 0,3 segundos para poder verlo ver inicialmente
             * cuando el contenido se demore mucho en cargar se puede quitar el timeout*/
            $timeout(function () {
                bsLoadingOverlayService.stop();
            }, 300);
        });

        $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.estadoUnidad = 'espera';

        try {
            $scope.uids = nutrifami.training.getUnidadesId($routeParams.leccion);
            var temp = [];
            for (var i in $scope.uids) {
                temp.push($scope.uids[i]);
            }
            $scope.unidad = nutrifami.training.getUnidad(temp[$routeParams.unidad - 1]);
            $scope.unidad.numeroUnidad = $routeParams.unidad;
            $scope.unidad.totalUnidades = temp.length;

            var tempOpciones = [];

            /* Validamos si la unidad actual es de parejas o de otra 
             * if - Si es parejas ponemos las imagenes de primeras y los textos abajo
             * else - Si es otro tipo de unidad, desorganizamos las opciones */
            if ($scope.unidad.tipo.id == 2) {
                var tempImagenes = [];
                /* Recorre todo el objeto de las opciones para crear el arreglo*/
                for (var i in $scope.unidad.opciones) {
                    /* Si la opción tiene imagen, se almacena en un arreglo temporal para que las imagenes queden juntas*/
                    if (typeof $scope.unidad.opciones[i].media === 'undefined') {
                        tempOpciones.push($scope.unidad.opciones[i]);
                    } else { /* Si no, se guardan en otro arreglo*/
                        tempImagenes.push($scope.unidad.opciones[i]);
                    }
                }
                /* Se mezclan los arreglos */
                shuffle(tempImagenes);
                shuffle(tempOpciones);
                $scope.unidad.opciones = tempImagenes.concat(tempOpciones); /* Se concatenan los arreglos, con las imagenes primero y las opciones despues */
            } else {
                for (var i in $scope.unidad.opciones) {
                    tempOpciones.push($scope.unidad.opciones[i]);
                }
                shuffle(tempOpciones);
                $scope.unidad.opciones = tempOpciones;
            }

            /*Verifica si la unidad tienen audio y lo carga*/
            if (typeof $scope.unidad.audio !== 'undefined') {
                $scope.unidad.audio.audio = ngAudio.load($scope.unidad.audio.url);
            }
        } catch (err) {
            /* Se debe verificar que se este en la unidad actual y que que se acceda atraves del navegador*/
            $location.path('/');
        }

        /* Obtenemos la cantidad de respuestas correctas*/
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

        $scope.seleccionarOpcion = function (index) {
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

        $scope.seleccionarPareja = function (index) {
            /* Verifica si es una opcion que no ha hecho match para poderla seleccionar*/
            if (!$scope.unidad.opciones[index].match) {

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
                            $scope.unidad.opciones[pareja1Pos].pareja = '';
                            $scope.unidad.opciones[pareja1Pos].selected = false;
                            $scope.unidad.opciones[pareja1Pos].match = false;
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

        $scope.calificarUnidad = function () {
            /* Validar si acerto o fallo*/
            var respuestasAcertadas = 0;
            for (var i in $scope.unidad.opciones) {
                if ($scope.unidad.opciones[i].selected) {
                    $scope.unidad.opciones[i].evaluacion = true;
                    if ($scope.unidad.opciones[i].selected == $scope.unidad.opciones[i].correcta) {
                        respuestasAcertadas++;
                    } else {
                        /* Almacena la respuesta incorrecta */
                        $scope.unidad.feedback = $scope.unidad.opciones[i].feedback;
                    }
                }
            }
            if (respuestasAcertadas === respuestasCorrectas) {
                $scope.estadoUnidad = 'acierto';
            } else {
                $scope.estadoUnidad = 'fallo';
            }

            $scope.feedback();
        };

        $scope.feedback = function () {
            var data = {
                estado: $scope.estadoUnidad,
                feedback: $scope.unidad.feedback
            };

            var feedbackModal = $uibModal.open({
                animation: true,
                templateUrl: 'views/modals/feedbackUnidad.html',
                controller: 'ModalInstanceController',
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            feedbackModal.result.then(function (estado) {
                if (estado === 'acierto') {
                    $scope.irASiguienteUnidad();
                } else {
                    $scope.reiniciarUnidad();
                }
            });
        };

        $scope.irASiguienteUnidad = function () {
            $scope.siguienteUnidad = parseInt($routeParams.unidad) + 1;
            if ($scope.siguienteUnidad > $scope.unidad.totalUnidades) {
                var avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));
                var lids = nutrifami.training.getLeccionesId($routeParams.modulo);
                var indice = 0;

                /*Busca el indice basado en el id de la lección para actualizar e avance*/
                for (var i in lids) {
                    if (lids[i] == $routeParams.leccion) {
                        indice = i;
                    }
                }
                avanceUsuario.lecciones[indice - 1] = 1;

                /* Mira cuantas lecciones se han terminaddo para dar un resultado final */
                var contador = 0;
                for (var i in avanceUsuario.lecciones) {
                    if (avanceUsuario.lecciones[i] == 1) {
                        contador++;
                    }
                }
                avanceUsuario.leccionesTerminadas = contador;
                localStorage.setItem("avanceUsuario", JSON.stringify(avanceUsuario));
                $location.path('/m/' + $routeParams.modulo + "/" + $routeParams.leccion + "/" + $routeParams.unidad + "/leccion-terminada");
            } else {
                $location.path('/m/' + $routeParams.modulo + "/" + $routeParams.leccion + "/" + $scope.siguienteUnidad);
            }
        };

        $scope.reiniciarUnidad = function () {
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
    }]);

nutrifamiApp.directive('opcionesUnidadInfo', function () {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            colspan: '=',
            index: '@'
        },
        templateUrl: 'views/directives/opcionesUnidadInfo.html',
        link: function ($scope, $element, $attrs) {
            $scope.click = function () {
                $scope.$parent.seleccionarOpcion($scope.index);
            };
        }
    };
});

nutrifamiApp.directive('parejasUnidadInfo', function () {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            index: '@'
        },
        templateUrl: 'views/directives/parejasUnidadInfo.html',
        link: function ($scope, $element, $attrs) {
            $scope.click = function () {
                $scope.$parent.seleccionarPareja($scope.index);
            };
        }
    };
});

nutrifamiApp.directive('calificarUnidad', function () {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'views/directives/calificarUnidad.html',
        link: function ($scope, $element, $attrs) {
            $scope.calificar = function () {
                $scope.$parent.calificarUnidad();
            };
        }
    };
});

nutrifamiApp.directive('reiniciarUnidad', function () {
    return {
        restrict: 'E',
        scope: {
            feedback: '='
        },
        templateUrl: 'views/directives/reiniciarUnidad.html',
        link: function ($scope, $element, $attrs) {
            $scope.reiniciar = function () {
                $scope.$parent.reiniciarUnidad();
            };
        }
    };
});

nutrifamiApp.directive('siguienteUnidad', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'views/directives/siguienteUnidad.html',
        link: function ($scope, $element, $attrs) {
            $scope.siguienteUnidad = function () {
                $scope.$parent.irASiguienteUnidad();
            };
        }
    };
});


nutrifamiApp.controller('ModalInstanceController', function ($scope, $uibModalInstance, data) {
    $scope.data = data;
    $scope.clickBoton = function () {
        $uibModalInstance.close($scope.data.estado);
    };
});