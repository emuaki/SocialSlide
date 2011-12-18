var SlideSession = function(args){
    this.initialize(args);
};

SlideSession.prototype = {
    
    initialize : function(args){
        this.socket = args.socket;
        this.id = this.socket.id;
        this.setupListener();
        console.log("SlideSession created." + this.id);
    },
    
    setupListener : function(){
        var self = this;
        this.socket.on('message', function(msg){
            console.log("slide page change. page:" + msg.page);
            self.socket.broadcast.emit("message", msg);
        });
    }
};

exports.create = function(){
    return new SlideSession(arguments[0]);   
};
