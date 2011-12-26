var util = util || {};
util.extend = function(destination, source, override) {
    
    function copy(dest, origin){
        for (var property in origin) {
            dest.prototype[property] = origin[property];
        }
    }
    copy(destination, source.prototype);
    copy(destination, override);
  
    return destination;
};

var LikeSplash  = function(){
    this.initialize();
};

LikeSplash.prototype = {
    
    likeString : "いいね!",
    
    classValue : "likeSplash",
    
    animeOption : {
        fontSize : "100px",
        duration : 1000
    },
    
    initialize : function(){
        this.element = $('<div class="' + this.classValue + '">' + this.likeString + '</div>');
        $(document.body).append(this.element);
    }, 
    
    move : function(){
        var point = this.calcShowPoint();
        this.element.css({
            left : point.x,
            top : point.y
        });
    },
    
    calcShowPoint : function(){
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
            fontSize: self.animeOption.fontSize,
            opacity: 0.1
        }, self.animeOption.duration, function(){
            self.element.fadeOut(1000);
            self.element.remove();
        });
    }
    
};

var BigLikeSplash  = function(){
    this.initialize();
};

util.extend(BigLikeSplash, LikeSplash, {
    
    likeString : "１００<br />いいね!",

    classValue : "big likeSplash",
    
    animeOption : {
        fontSize : "200px",
        duration : 2000
    },

    calcShowPoint : function(){
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        
        var x = windowWidth / 2 - 300;
        var y = windowHeight / 2 - 300;

        return {x : x, y : y};
    }
    
});

var LikePanel = function(args){
    this.initialize(args);
};

LikePanel.prototype = {
    
    likeButtonDisable : false,
    
    timer : null,
    
    kiriban : {},

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
        this.timer = setTimeout(function(){
            self.likeButtonDisable = false;
            self.likeButton.css({"opacity": "1.0"}); 
        }, 10000);
        this.socket.emit("likeSession-like", {});
    },
    
    onLikeCountUp : function(data){
        this.likeCount.html(data.count);
        if(data.initial) return;
        if(this.timer !== null) clearTimeout(this.timer);
        this.likeButton.css({"opacity": "1.0"});
        new LikeSplash().show();
        this.likeButtonDisable = false;
    },
    
    judgeKiriban : function(count){
        if(count / 100 % 1 == 0){
            
        }
    }

};
