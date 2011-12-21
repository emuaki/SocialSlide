var SlideSession = function(args){
    this.initialize(args);
};

SlideSession.prototype = {
    
    pageChangeKey  : "SlideSession-pageChange",
    
    initialize : function(args){
        this.socket = args.socket;
        this.id = this.socket.id;
        this.setupListener();
        this.service = require('services/slide_service').getService();
        this.socket.emit(this.pageChangeKey, {page : this.service.pageNo});
        console.log("SlideSession created." + this.id + ", pageNo:" + this.service.pageNo);
    },
    
    setupListener : function(){
        var self = this;
        this.socket.on('SlideSession-pageChange', function(data){
            console.log("slide page change. page:" + data.page);
            self.service.change(data.page);
            self.socket.broadcast.emit(self.pageChangeKey, data);
        });
    }
};

exports.create = function(){
    return new SlideSession(arguments[0]);   
};
