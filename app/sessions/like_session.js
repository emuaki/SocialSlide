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
        this.socket.on("likeSession-like", function(data, ack){
            if(!data){
                console.log(data);
                return;
	    }

            self.likeService.countUp();
            self.sendCurrentCount(data.stampId);
	    ack();
        });
    },
    
    sendCurrentCount : function(stampId){
        var count = this.likeService.getCount();
        var message = {
            count : count,
	    stampId : stampId
        };
        if( count % 100 === 0){
            message.kiriban = true;   
        }
        console.log("likeSession-like. count:" + message);
        this.socket.emit('likeSession-likeCountUp', message);
        this.socket.broadcast.volatile.emit('likeSession-likeCountUp', message);
    }
    
};

exports.create = function(){
    return new LikeSession(arguments[0]);   
};
