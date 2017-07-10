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
        var location = JSON.parse(localStorage.getItem('location'));

        if (location === null) {
            $http({
                method: 'GET',
                url: 'http://nutrifami.org/app/api/get-location',

            }).then(function successCallback(response) {
                location = response.data;
                localStorage.setItem("location", JSON.stringify(location));
                callback(location);
            }, function errorCallback(response) {
                callback(response.data);
            });
        } else {
            callback(location);
        }

    };
    return service;
});
