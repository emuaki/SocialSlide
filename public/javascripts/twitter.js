
var TwitterPanel = function(args){
    this.initialize(args);
};

TwitterPanel.prototype = {

    maxSize : 3,

    size : 0,
        
    initialize: function(args) {
        this.socket = args.socket;
        this.container = $(args.selecter);
        this.setPanelElements();
        var self = this;
        this.socket.on('tweet', function (tweet) {
            self.onTweet(tweet);
        });
    },
    
    setPanelElements: function() {
       this.messages = $('<ul class="tweetContainer"></ul>');
       this.container.append(this.messages);
    },
    
    onTweet: function(tweet) {
         var contents = $('<li class="tweet"></li>');
         contents.append('<div class="tweetImage"><img src="' + tweet.imageUrl + '" /></div>');
         contents.append('<div>' + tweet.text + '</div>');
         this.messages.prepend(contents);
         contents.fadeIn(1000);

         this.size++;
         if(this.size > this.maxSize){
             this.messages.find('li').last().remove();
         }
    },

    blink: function(ele, isDown) {

    }

}
