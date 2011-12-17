var LikeCounter = function(args){
  
};

LikeCounter.prototype = {
    
};

var LikeService = function(args){
    this.initialize(args);
};

LikeService.prototype = {
    
    initialize : function(args){
    }
    
};

var likeService = new LikeService();
exports.getLikeService = function(){
    return likeService;   
};
