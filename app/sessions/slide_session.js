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
        this.socket.on('SlideSession-pageChange', function(data){
            console.log("slide page change. page:" + data.page);
            self.socket.broadcast.emit("SlideSession-pageChange", data);
        });
    }
};

exports.create = function(){
    return new SlideSession(arguments[0]);   
};
