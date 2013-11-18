var express = require('express');
var app = express.createServer(), io = require('socket.io').listen(app);
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d", app.address().port);

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.set('view options', {layout: false});
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/../public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});

io.configure('production', function(){
	io.enable('browser client minification');
	io.enable('browser client gzip');
	io.set('transports', [
		'websocket',
		'xhr-polling',
		'jsonp-polling'
	]);
	io.set( "log level", 1 );
});

process.on('uncaughtException', function (err) {
	console.error('error: ' + err.stack);
});


function doShow(req, res, isPost){
	var data = isPost ? req.body : req.query;
	if(login(data.admin, data.count, data.password)){
		admin = true;
	}
}

app.get('/', function(req, res){ 
	res.render('index.ejs');
});

app.post('/', function(req, res){ 
	doShow(req, res, true); 
});

app.get('/login', function(req, res){
	res.render('login.ejs'); 
});

function login(data){
	if(data.password !== "sugiura0172") return false;
	return true;
}

app.all('/master', function(req, res){ 
	var data = req.body;
	if(login(data)){
		res.render('master.ejs');
	}
	res.render('error.ejs');
});

app.post('/clear', function(req, res){ 
	var data = req.body;
	if(login(data)){
		console.log("clear counter:" + data.count);
		require('services/like_service').getService().clear();
		res.render('master.ejs');
	}
	res.render('error.ejs');
});


var sessionManager = require('session_manager').create({io:io});
sessionManager.start();
