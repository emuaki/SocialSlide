var LikeSession = function(args){
    this.initialize(args);
};

LikeSession.prototype = {
    
    initialize : function(args){
        this.socket = args.socket;
        this.id = this.socket.id;
    }
    
};

exports.create = function(){
    return new LikeSession(arguments[0]);   
};
