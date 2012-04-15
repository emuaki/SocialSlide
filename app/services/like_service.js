
var LikeCounter = function(args){
  
};

LikeCounter.prototype = {
    
    current : 0,
    
    countUp : function(){
        this.current++;
    },
    
    getCount : function(){
        return this.current;   
    },
    
    clear : function(){
        this.current = 0;
    }
    
};

var LikeService = function(args){
    this.initialize(args);
};

LikeService.prototype = {
    
    initialize : function(args){
        this.counter = new LikeCounter();
    },
    
    countUp : function(){
        this.counter.countUp();   
    },
    
    getCount : function(){
        return this.counter.getCount();   
    },

    clear : function(){
        this.counter.clear();
    }

};

var likeService = new LikeService();
exports.getService = function(){
    return likeService;   
};
