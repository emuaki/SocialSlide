var express = require('express');
var app = express.createServer(), io = require('socket.io').listen(app);
var port = process.env.PORT || process.env.C9_PORT;
app.listen(port);
console.log("Express server listening on port %d", app.address().port);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
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
        'htmlfile',
        'xhr-polling',
        'jsonp-polling'
    ]);
    io.set( "log level", 1 );
});

function login(admin, pageNo, password){
    if(password != "simplex") return false;
    if(admin != "true") return false;
    if(isNaN(pageNo)) return false;
    return true;
}

function doShow(req, res, isPost){
    var admin = false;
    
    var data = isPost ? req.body : req.query;
    if(login(data.admin, data.pageNo, data.password)){
        console.log("admin login. page:" + data.pageNo);
        admin = true;
        require('services/slide_service').getService().change(data.pageNo - 0 );
    }

    res.render('index.ejs', { admin : admin });    
}

app.get('/', function(req, res){ doShow(req, res, false); });
app.post('/', function(req, res){ doShow(req, res, true); });

app.get('/login', function(req, res){
    res.render('login.ejs'); 
});

app.get('/lt', function(req, res){
    res.render('lt.ejs'); 
});

var sessionManager = require('session_manager').create({io:io});
sessionManager.start();
