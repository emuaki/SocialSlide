var LikeSession = function(args){
    this.initialize(args);
};

LikeSession.prototype = {
    
    initialize : function(args){
        this.socket = args.socket;
        this.id = this.socket.id;
        this.setupListener();
        this.likeService = require('services/like_service').getService();
        var count = this.likeService.getCount();
        this.socket.emit('likeSession-likeCountUp', {initial: true, count : count});
    },
    
    setupListener : function(){
        var self = this;
        this.socket.on("likeSession-like", function(){
            self.likeService.countUp();
            self.sendCurrentCount();
        });
    },
    
    sendCurrentCount : function(){
        var count = this.likeService.getCount();
        console.log("likeSession-like. count:" + count);
        this.socket.emit('likeSession-likeCountUp', {count : count});
        this.socket.broadcast.volatile.emit('likeSession-likeCountUp', {count : count});
    }
    
};

exports.create = function(){
    return new LikeSession(arguments[0]);   
};
