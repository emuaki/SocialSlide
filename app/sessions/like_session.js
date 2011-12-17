var LikeSession = function(args){
    this.initialize(args);
};

LikeSession.prototype = {
    
    initialize : function(args){
        this.socket = args.socket;
        this.id = this.socket.id;
        this.setupListener();
        this.likeService = require('services/like_service').getLikeService();
    },
    
    setupListener : function(){
        var self = this;
        this.socket.on("likeSession-like", function(){
            self.likeService.countUp();
            var count = self.likeService.getCount();
            self.socket.broadcast.emit('likeSession-likeCountUp', {count : count});
        });
    }
    
};

exports.create = function(){
    return new LikeSession(arguments[0]);   
};
