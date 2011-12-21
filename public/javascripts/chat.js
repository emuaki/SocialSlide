var ChatPanel = function(args){
    this.initialize(args);
};

ChatPanel.prototype = {
    
    maxMessageSize : 5,

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
            self.socket.emit("ChatSession-newMessage", {
                name : self.nameField.val(),
                message : self.messageField.val()
            });
           return false;
        });
        this.socket.on("ChatSession-newMessage", function(data){
            self.onReceive(data);
        });
    },
    
    onReceive : function(data){
        console.log(data);
        var messages = data.chatMessage;
        if(messages === undefined) return;
        for(var i in messages){
            this.addMessage(messages[i]);
        } 
    },
    
    addMessage : function(chatMessage){
        var list = this.createListElement(chatMessage);
        this.container.prepend(list);
        this.adjust();
    },
    
    createListElement : function(data){
        return "<li>" + data.name + ":" + data.message + "</li>";
    },
    
    adjust : function(){
        var listSize = this.container.find("*").size();
        if(listSize > this.maxMessageSize){
            this.container.find(":last").remove();   
        }
    }

};
