"use strict";

var TwitterSession = function(args){
    this.initialize(args);
};

TwitterSession.prototype = {
    
    initialize : function(args){
        this.socket = args.socket;
        this.id = this.socket.id;
        this.service = require('services/twitter_service').getService();
        this.initialSend();
        this.setupListener();
    },
    
    initialSend : function(){
    },
    

    getPublisher : function(){
        return this.service.publisher;
    },

    setupListener : function(){
        var self = this;
        this.getPublisher().on('tweet', function(tweet){
            console.log("publish tweet");
            console.log(tweet);
            self.socket.emit('tweet', tweet);
        });
    }

};

exports.create = function(args){
    return new TwitterSession(args);   
};

