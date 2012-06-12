var util = require('util'),
    events = require('events');

var TwitterPublisher = function(){
    this.initialize();
};

util.inherits(TwitterPublisher, events.EventEmitter);

TwitterPublisher.prototype.initialize = function(){

};

TwitterPublisher.prototype.start = function(){
    console.log("TwitterPublisher.start");
    var self = this;
    var Twitter = require('ntwitter');
    var twit = new Twitter({
        consumer_key: 'FOqTAayAfyMgKdYwQ3EwhA',
        consumer_secret: 'bMkQSr0bd1xTzZfr2U4MnKEiradp5P3iLDSJInxo',
        access_token_key: '463759440-L7wfycq1ea0oSj6pd2qZExcKMXw6MhsDo3G8UFa7',
        access_token_secret: 'OvxQtfQwZ3vvObf5UkAS56jBhsDQX6EfxMUxZ8uTE'
    });
    
    twit.stream('statuses/filter', {track: "サッカー,日本代表,オーストラリア戦"}, function(stream) {
        stream.on('data', function (data) {
            
            var tweet = {
                name : data.user.screen_name,
                imageUrl : data.user.profile_image_url,
                text : data.text,
                createdAt : data.created_at
            };
            self.publish(tweet);
        });
    });
};
    
TwitterPublisher.prototype.publish = function(tweet){
    this.emit('tweet', tweet);
};

TwitterPublisher.prototype.latestTweets = function(){

};

exports.create = function(){
    return new TwitterPublisher(arguments[0], arguments[1]);   
};

