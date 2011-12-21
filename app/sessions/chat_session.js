var ChatSession = function(args){
    this.initialize(args);
};

ChatSession.prototype = {
    
    newMessageKey  : "ChatSession-newMessage",
    
    initialize : function(args){
        this.socket = args.socket;
        this.id = this.socket.id;
        this.setupListener();
        this.service = require('services/chat_service').getService();
        this.socket.emit(this.newMessageKey, {page : this.service.pageNo});
        console.log("ChatSession created." + this.id);
    },
    
    setupListener : function(){
        var self = this;
        this.socket.on(this.newMessageKey, function(data){    
            self.service.add(data.message);
            self.socket.broadcast.emit(self.newMessageKey, data);
        });
    }
};

exports.create = function(){
    return new ChatSession(arguments[0]);   
};
