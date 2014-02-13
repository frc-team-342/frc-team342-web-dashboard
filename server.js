var NetConsole = require('frc-netconsole').NetConsole;
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var c = new NetConsole(342);
c.connect();
  
c.onMessage(function(message, info) {
	io.sockets.emit('news', { 'message' : message.toString() });
});

io.set('log level', 2);

io.sockets.on('connection', function (socket) {
  socket.on('control', function(data) {
    c.send(data);
  });
});



app.listen(3000);;
