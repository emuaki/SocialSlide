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

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

var hostname = "http://socialslide.dev.c9.io/";
app.configure('production', function() {
    hostname = "http://socialslide.herokuapp.com/";
});

app.get('/', function(req, res){
  res.render('index', {
    title: 'Social Slide',
    desc: 'このページはSocial Slideのサンプルページです。',
    hostname : hostname
  });
});

app.get('/deck', function(req, res){
  res.render('deck', {
    hostname : hostname
  });
});

var sessionManager = require('session_manager').create({io:io});
sessionManager.start();
