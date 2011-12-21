var express = require('express');
var app = express.createServer(), io = require('socket.io').listen(app);
var port = process.env.PORT || process.env.C9_PORT;
app.listen(port);
console.log("Express server listening on port %d", app.address().port);

// Configuration
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

var hostname = "http://socialslide.dev.c9.io/";
app.configure('production', function(){
  app.use(express.errorHandler()); 
  hostname = "http://socialslide.herokuapp.com/";
});

app.get('/', function(req, res){
    var admin = false;
    if(req.query.admin == "true"){
        admin = true;
    }
    res.render('index.ejs', {
        hostname : hostname,
        admin : admin
    });
});

var sessionManager = require('session_manager').create({io:io});
sessionManager.start();
