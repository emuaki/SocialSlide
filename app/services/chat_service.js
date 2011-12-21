var ChatMessage = function(args){
    this.initialize(args);    
};

ChatMessage.prototype = {
    timestamp : null,
    
    name : "",
    
    message : ""
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
        var currentSize = this.queue[currencyPair].length;
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
