nutrifamiApp.factory('TipsService', function () {
    var service = {};

    /**
     * 
     * @returns {Array|Object}
     * 
     * TipsService.getTipsByLeccion()
     *  
     */
    service.getTipsByLeccion = function (leccion) {
        
        var tids = nutrifami.training.getLeccion(leccion).tips;
        var tips = [];
        for (var i in tids){
            //console.log(tids[i]);
            var tip = this.getTipById(tids[i]);
            
            if(tip.activo != 0){
                tips.push(tip);
            }
        }
        
        return tips;
    };
    
    service.getTipById = function(tid){
        return nutrifami.training.getTips()[tid];
    };

    

    return service;
});
