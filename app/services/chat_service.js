var DateUtil = require('date').DateUtil;

var ChatMessage = function(args){
    this.initialize(args);    
};

ChatMessage.prototype = {
    
    maxLength : 256,
    
    timestamp : null,
    
    name : "",
    
    message : "",
    
    initialize : function(args){
        this.timestamp = DateUtil.currentDateAsString();
        this.name = args.name || "nanashi";
        this.message = args.message;
    },
    
    validate : function(){
        if(this.message === undefined || this.message == "") return false;
        if(this.message.length > this.maxLength) return false;
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
    
    adjust : function(){
        var currentSize = this.queue.length;
        if(currentSize > this.maxQueueSize){
            this.queue.shift();
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
