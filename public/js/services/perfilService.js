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
            url: 'http://127.0.0.1:83/app/api/get-location',

        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback(response) {
            console.log(response);
            callback(response);
        });

    };
    return service;
});
