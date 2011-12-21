var ChatMessage = function(args){
    this.initialize(args);    
};

ChatMessage.prototype = {
    timestamp : null,
    
    name : "",
    
    message : ""
};

var ChatContainer = function(){    
  
};

ChatContainer.prototype = {
    
    maxQueueSize : 30,
    
    put : function(bar){
        var currencyPair = bar.currencyPair;
        if(this.queue[currencyPair] === undefined){
            this.queue[currencyPair] = [];
        }
        this.queue[currencyPair].push(bar);
        this.adjust(currencyPair);
    },
    
    adjust : function(currencyPair){
        var currentSize = this.queue[currencyPair].length;
        if(currentSize > this.maxQueueSize){
            this.queue[currencyPair].shift();
        }
    },
    
    find : function(currencyPair, size){
        var queue = this.queue[currencyPair];
        if(undefined === queue) return [];
        var i = queue.length - size;
        if(i < 0){
            i = 0;
        }
        var result = [];
        for(; i < queue.length; i++){
            result.push(queue[i]);
        }
        return result;
    },
    
    findAll : function(){
        return this.queue;   
    }
    
};


var ChatService = function(args){
    this.queue = {};
    this.initialize(args);
};

ChatService.prototype = {
    
    initialize : function(args){
        
    },
    
    change : function(pageNo){
        this.pageNo = pageNo;
    }
    
};

var chatService = new ChatService();
exports.getService = function(){
    return chatService;   
};
