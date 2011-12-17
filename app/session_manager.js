var SessionStore = function(){
    this.sessions = {};
    this.initialize();
};

SessionStore.prototype = {

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
        var sessionStore = new SessionStore();
        var likeSession = require('sessions/like_session').create({socket: socket});
        sessionStore.add("LikeSession", likeSession);
        return sesssionStore;
    },
    
    addSession : function(session){
        this.sessions[session.id] = session;
    },
    
    removeSession : function(id){
        delete this.sessions[id];
    }
};

exports.create = function(){
    return new SessionManager(arguments[0]);   
};


