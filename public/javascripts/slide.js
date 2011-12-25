var SlideControl = function(args){
    this.initialize(args);
};

SlideControl.prototype = {

    isReady : true,
    
    initialize : function(args){
        this.admin = args.admin;
        this.socket = args.socket;
        this.setupDeck();        
        this.setupListener();
    },
    
    setupDeck : function(){
        
        
        $.deck('.slide', {
            keys: {
                // page down, right arrow, down arrow
                next: [34, 39, 40],
                // page up, left arrow, up arrow
                previous: [33, 37, 38]
            }
        });
        
        if(! this.admin){
            $.deck('extend', 'next', function(){});
            $.deck('extend', 'prev', function(){});
        }               
    },
    
    setupListener : function(){
        var self = this;
        $(document).bind('deck.change', function(event, from, to) {
            self.myPageChange(from , to);
        });      
        this.socket.on("SlideSession-pageChange", function(data){
            self.onPageChange(data);
        });
    },
    
    myPageChange : function(from ,to){
        if(this.isReady) {
            console.log("from:" + from  + ", to:" + to);
            this.socket.emit("SlideSession-pageChange", {page : to} );
        }
        this.isReady = true;
    },
    
    onPageChange : function(data){
        this.isReady = false;
        $.deck('go', data.page);    
    }

};
