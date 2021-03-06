var StatusSession = function(args){
	this.initialize(args);
};

StatusSession.prototype = {
	
	statusChangeKey : "StatusSession-statusChange",

	initialize : function(args){
		this.socket = args.socket;
		this.id = this.socket.id;
		this.service = require('services/status_service').getService();
		this.service.plusConnectionCount();
		this.setupListener();
		this.socket.emit(this.statusChangeKey, {
			connectionCount: this.service.connectionCount
		});
		this.socket.broadcast.emit(this.statusChangeKey, { 
			connectionCount: this.service.connectionCount
		});
		console.log("StatusSession created." + this.id + ", connectionCount:" + this.service.connectionCount);
	},
	
	setupListener : function(){
		var self = this;
		this.socket.on('disconnect', function(){
			self.service.minusConnectionCount();
			self.socket.broadcast.emit(self.statusChangeKey, { 
				connectionCount: self.service.connectionCount
			});
		});
	}
};

exports.create = function(){
	return new StatusSession(arguments[0]);
};
