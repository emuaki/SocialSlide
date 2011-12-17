var LikeSplash  = function(){
    this.initialize();
}

LikeSplash.prototype = {
    
    initialize : function(){
        this.element = $('<div style="position:absolute">いいね!</div>');
    }, 
    
    move : function(){
        var point = this.calcRandomPoint();
        this.element.css({
            left : point.x,
            top : point.y
        });
    },
    
    calcRandomPoint : function(){
        var x = Math.floor(Math.random()*800);
        var y = Math.floor(Math.random()*600);
        return {x : x, y : y};
    },
    
    show : function(){
        
        this.element.fadeIn(500);
        var self = this;
        setTimeout(function(){
            self.element.fadeOut(1000);
        }, 1000);
    }
    
};

var LikePanel = function(args){
    this.initialize(args);
};

LikePanel.prototype = {
    
    initialize : function(args){
        this.socket = args.socket;
        this.likeButton = $(args.likeButtonSelector);
        this.likeSplash = $(args.likeSplashSelector);
        this.likeSplash.hide();
        this.likeCount = $(args.likeCountSelector);   
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
        });
    },
    
    onLikeCountUp : function(data){
        this.likeCount.html(data.count);
        this.showLike();
    },
    
    showLike : function(){
        var self = this;
        this.likeSplash.show();
        setTimeout(function(){
            self.hideLike();    
        }, 5000);
    },
    
    hideLike : function(){
        this.likeSplash.hide();
    }

};
