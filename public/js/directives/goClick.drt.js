nutrifamiApp.directive('goClick', function($location, $timeout) {
    return function(scope, element, attrs) {
        var path;

        attrs.$observe('goClick', function(val) {
            path = val;
        });

        element.bind('click', function() {
            console.log("click");
            scope.$apply(function() {
                $location.path(path);
            });
        });
    };
});
