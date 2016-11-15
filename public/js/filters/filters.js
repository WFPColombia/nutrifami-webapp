nutrifamiApp.filter("trust", ['$sce', function($sce) {
    return function(htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    }
}]);

nutrifamiApp.filter('format', function() {
    return function(input) {
        input = input || '';
        if (input.slice(0, 3) != '<p>') {
            input = "<p>" + input + "</p>";

        }
        return input;
    };
})


nutrifamiApp.filter('stripHTML', function() {
    return function(input) {
        input = input || '';
        input.replace(/<(?:.|\n)*?>/gm, '');
        return input;
    };
})
