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
        this.socket.emit(this.newMessageKey, {chatMessages : this.service.findAll()});
        console.log("ChatSession created." + this.id);
    },
    
    setupListener : function(){
        var self = this;
        this.socket.on(this.newMessageKey, function(data){
            self.onReceive(data);
        });
    },
    
    onReceive : function(data){
        var chatMessage = this.convert();
        var validateResult = chatMessage.validate();
        if(validateResult){
            this.service.put(chatMessage);
            this.socket.broadcast.emit(this.newMessageKey, [chatMessage]);
        }else{
            // send error message
        }
    },
    
    convert : function(data){
        return this.service.createChatMessage(data);
    }
};

exports.create = function(){
    return new ChatSession(arguments[0]);   
};
