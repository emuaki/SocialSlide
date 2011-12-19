var LikeSplash  = function(){
    this.initialize();
};

LikeSplash.prototype = {
    
    initialize : function(){
        this.element = $('<div style="position:absolute">いいね!</div>');
        $(document.body).append(this.element);
    }, 
    
    move : function(){
        var point = this.calcRandomPoint();
        this.element.css({
            left : point.x,
            top : point.y
        });
    },
    
    calcRandomPoint : function(){
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var x = Math.floor(Math.random() * windowWidth);
        var y = Math.floor(Math.random() * windowHeight);
        return {x : x, y : y};
    },
    
    show : function(){
        this.move();
        this.element.fadeIn(500);
        var self = this;
        setTimeout(function(){
            self.element.fadeOut(1000);
            self.element.remove();
        }, 1000);
    }
    
};

var LikePanel = function(args){
    this.initialize(args);
};

LikePanel.prototype = {

    initialReceive : false,
    
    initialize : function(args){
        this.socket = args.socket;
        this.likeButton = $(args.selector.button);
        this.likeCount = $(args.selector.counter);   
        this.setupListener();
    },
    
    setupListener : function(){
        var self = this;
        this.likeButton.click(function(){
           self.socket.emit("likeSession-like", {});
           return false;
        });
        this.socket.on("likeSession-likeCountUp", function(data){
            self.onLikeCountUp(data);
            self.initialReceive = true;
        });
    },
    
    onLikeCountUp : function(data){
        this.likeCount.html(data.count);
        if(! this.initialReceive) return;
        new LikeSplash().show();
    }

};
