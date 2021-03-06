var ChatPanel = function(args){
    this.initialize(args);
};

ChatPanel.prototype = {
    
    sendButtonDisable : false,
    
    maxMessageSize : 5,
    
    timer : null,

    initialize : function(args){
        this.socket = args.socket;
        this.sendButton = $(args.selector.button);
        this.nameField = $(args.selector.name);
        this.messageField = $(args.selector.message);
        this.container = $(args.selector.container);
        this.setupListener();
    },
    
    setupListener : function(){
        var self = this;
        this.sendButton.click(function(){
            self.clickSendButton();
           return false;
        });
        this.socket.on("ChatSession-newMessage", function(data){
            self.onReceive(data);
        });
    },
    
    clickSendButton : function(){
        if(this.sendButtonDisable) return;
        this.sendButtonDisable = true;
        
        this.socket.emit("ChatSession-newMessage", {
            name : this.nameField.val(),
            message : this.messageField.val()
        });  
        
        this.messageField.val("");
        var self = this;
        this.sendButton.css({ "opacity": "0.5"});
        self.timer = setTimeout(function(){
            self.sendButtonDisable = false;
            self.sendButton.css({"opacity": "1.0"}); 
        }, 10000);        
    },
    
    onReceive : function(data){
        console.log(data);
        var messages = data.chatMessages;
        if(messages === undefined) return;
        for(var i in messages){
            this.addMessage(messages[i]);
        }
        if(this.timer !== null) clearTimeout(this.timer);
        this.sendButton.css({ "opacity": "1.0"});
        this.sendButtonDisable = false;
    },
    
    addMessage : function(chatMessage){
        var list = this.createListElement(chatMessage);
        this.container.prepend(list);
        this.adjust();
    },
    
    createListElement : function(data){
        return  [
            '<li class="chatMessageLine">',
            '<span class="chatMessageTimestamp">',
            data.timestamp,
            "</span>",
            '<span class="chatMessageName">',
            data.name,
            "</span>",
            '<span class="chatMessage">',
            data.message,
            "</span>",
            "</li>"
        ].join("");
    },
    
    adjust : function(){
        var listSize = this.container.find("li").size();
        console.log(listSize);
        if(listSize > this.maxMessageSize){
            this.container.find("li:last").remove();   
        }
    }

};
