nutrifamiApp.factory('PerfilService', function($http, $rootScope, $cookieStore, $timeout) {
    var service = {};
    service.editarUsuario = function(usuario, callback) {
        nutrifami.editarUsuarioActivo(usuario, function(response) {
            callback(response);
        });

    };

    service.agregarFamiliar = function(familiar, callback) {
        nutrifami.agregarFamiliar(familiar, function(response) {
            callback(response);
        });

    };

    service.agregarUsuario = function(familiar, callback) {
        nutrifami.agregarUsuario(familiar, function(response) {
            callback(response);
        });

    };

    service.getLocation = function(callback) {
        var callback = callback || function() {};

            $http({
                method: 'GET',
                url: 'js/location.json',

            }).then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(response) {
                callback(response.data);
            });

    };
    return service;
});
