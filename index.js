 // Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

//My additions for tv remote
const eventEmitter = require('events');
const emitter = new eventEmitter();

emitter.on('remoteClicked', function() {
  console.log('a button was clicked');
});

emitter.emit('remoteClicked');

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));



io.on('connection', (socket) => {
  socket.on('remoteClicked', (data) => {
    console.log("data");
    console.log(data);
    if(data.button === "power-button") {
      socket.emit('clickButton', {
        data: data
      });
    } else {
      io.sockets.emit('clickButton', {
        data: data
      });
    }
  });
});

