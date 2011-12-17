var LikePanel = function(args){
    this.initialize(args);
};

LikePanel.prototype = {
    
    initialize : function(args){
        this.socket = args.socket;
        this.likeButton = $(args.likeButtonSelector);
        this.likeSplash = $(args.likeMessageSelector);
        this.likeView.hide();
        this.likeCount = $(args.likeCountSelector);   
        this.setupListener();
    },
    
    setupListener : function(){
        var self = this;
        this.likeButton.click(function(){
           alert(test);
           return false;
        });
        this.socket.on("likeSession-likeCountUp", function(data){
            alert("likeCountup");
            self.onLikeCountUp(data)
        });
    },
    
    onLikeCountUp : function(data){
        this.likeCount.html(data.count);
        this.showLike();
    },
    
    showLike : function(){
        this.like.show();
    }

}