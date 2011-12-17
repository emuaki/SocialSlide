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

var sessionManager = require('session_manager').create({io:io});
sessionManager.start();

// クライアントが接続してきたときの処理
io.sockets.on('connection', function(socket) {
    console.log(socket.id + ' connected');
    // メッセージを受けたときの処理
    socket.on('message', function(msg) {
        console.log(socket.id + "'s send " + msg);
        // クライアントにメッセージを送信する
        console.log("クライアントにメッセージを送信しました。" + msg.page);
        socket.broadcast.emit("message", msg);
    });
    // クライアントが切断したときの処理
    socket.on('disconnect', function(){
        console.log(socket.sessionId + ' disconnected');
    });
});
