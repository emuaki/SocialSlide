var TwitterService = function(args){
    this.initialize(args);
};

TwitterService.prototype = {

    initialize : function(args){
        this.publisher = require('services/twitter_publisher').create();
        this.publisher.start();
        console.log("twitter service initialize");
    },
    
    start : function(){
        
    }
};

var twitterService = new TwitterService();
exports.getService = function(){
    return twitterService;   
};
