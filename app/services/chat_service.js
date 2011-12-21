var ChatMessage = function(args){
    this.initialize(args);    
};

ChatMessage.prototype = {
    
    maxSize : 256,
    
    timestamp : null,
    
    name : "",
    
    message : "",
    
    initialize : function(args){
        this.timestamp = new Date();
        this.name = args.name || "nanashi";
        this.message = args.message;
    },
    
    validate : function(){
        if(this.message == "") return false;
        if(this.message.length > this.maxSize) return false;
        if(this.name > this.maxSize) return false;
        
        return true;
    }
};

var ChatContainer = function(){    
    this.queue = [];
};

ChatContainer.prototype = {
    
    maxQueueSize : 5,
    
    put : function(chatMessage){
        this.queue.push(chatMessage);
        this.adjust();
    },
    
    adjust : function(currencyPair){
        var currentSize = this.queue.length;
        if(currentSize > this.maxQueueSize){
            this.queue[currencyPair].shift();
        }
    },
    
    findAll : function(){
        return this.queue;   
    }
    
};


var ChatService = function(args){
     this.initialize(args);
};

ChatService.prototype = {
    
    initialize : function(args){
        this.container = new ChatContainer();
    },
    
    put : function(chatMessage){
        this.container.put(chatMessage);
    },
    
    findAll : function(){
        return this.container.findAll();
    }
    
};

var chatService = new ChatService();
exports.getService = function(){
    return chatService;   
};

exports.createChatMessage = function(args){
    return new ChatMessage(args);  
};
