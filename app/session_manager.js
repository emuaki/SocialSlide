var SessionStore = function(option){
    this.sessions = {};
    this.initialize(option);
};

SessionStore.prototype = {
    
    initialize : function(option){
        this.id = option.socket.id;
    },

    add : function(key, session){
        this.sessions[key] = session;
    }, 
    
    get : function(key){
        return this.sessions[key];   
    }
};


var SessionManager = function(option){
    this.initialize(option);
};

SessionManager.prototype = {
    
    sessions : {},
    
    initialize : function(option){
        this.io = option.io;
        this.connectionCount = 0;
    },
    
    start : function(){
        var self = this;
        self.io.sockets.on('connection', function (socket) {

            self.connectionCount++;
            self.addSession(self.createSessionStore(socket));
            socket.broadcast.emit('connectionCountChange', { 
                message : 'connected',
                connectionCount: self.connectionCount
            });
            
            socket.on('disconnect', function(){
                self.removeSession(socket.id);
                socket.broadcast.emit('connectionCountChange', { 
                    message : 'disconnected',
                    connectionCount: self.connectionCount
                });
            });
        });
        
    },
    
    createSessionStore : function(socket){
        var sessionStore = new SessionStore({socket: socket});
        var likeSession = require('sessions/like_session').create({socket: socket});
        var slideSession = require('sessions/slide_session').create({socket: socket});
        var statusSession = require('sessions/status_session').create({socket: socket});

        sessionStore.add("LikeSession", likeSession);
        sessionStore.add("SlideSession", slideSession);
        sessionStore.add("StatusSession", statusSession);        
        return sessionStore;
    },
    
    addSession : function(sessionStore){
        this.sessions[sessionStore.id] = sessionStore;
    },
    
    removeSession : function(id){
        delete this.sessions[id];
    }
};

exports.create = function(){
    return new SessionManager(arguments[0]);   
};


