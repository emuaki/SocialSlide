var LikeSplash  = function(){
    this.initialize();
};

LikeSplash.prototype = {
    
    initialize : function(){
        this.element = $('<div class="likeSplash">いいね!</div>');
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
        var x = Math.floor(Math.random() * windowWidth) - 100;
        var y = Math.floor(Math.random() * windowHeight) -100;
        if(x < 0) x = 0;
        if(y < 0) y = 0;
        return {x : x, y : y};
    },
    
    show : function(){
        var self = this;
        this.move();
        this.element.fadeIn();
        this.element.animate({
            fontSize: "100px",
            opacity: 0.1
        }, 1000, function(){
            self.element.fadeOut(1000);
            self.element.remove();
        });
    }
    
};

var LikePanel = function(args){
    this.initialize(args);
};

LikePanel.prototype = {
    
    likeButtonDisable : false,

    initialize : function(args){
        this.socket = args.socket;
        this.likeButton = $(args.selector.button);
        this.likeCount = $(args.selector.counter);   
        this.setupListener();
    },
    
    setupListener : function(){
        var self = this;
        this.likeButton.click(function(){
            self.clickLikeButton();
            return false;
        });
        this.socket.on("likeSession-likeCountUp", function(data){
            self.onLikeCountUp(data);
            self.initialReceive = true;
        });
    },
    
    clickLikeButton : function(){
        if(this.likeButtonDisable) return;
        this.likeButtonDisable = true;
        
        var self = this;
        this.likeButton.css({ "opacity": "0.5"});
        setTimeout(function(){
           self.likeButton.css({"opacity": "1.0"}); 
        }, 10000);
        this.socket.emit("likeSession-like", {});
    },
    
    onLikeCountUp : function(data){
        this.likeCount.html(data.count);
        if(data.initial) return;
        this.likeButton.css({"opacity": "1.0"});
        new LikeSplash().show();
        this.likeButtonDisable = false;
    }

};
