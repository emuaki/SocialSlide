
var SlideService = function(args){
    this.initialize(args);
};

SlideService.prototype = {
    
    pageNo : 0,
    
    initialize : function(args){
        
    },
    
    change : function(pageNo){
        this.pageNo = pageNo;
    }
    
};

var slideService = new SlideService();
exports.getService = function(){
    return slideService;   
};
