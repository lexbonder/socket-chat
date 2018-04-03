var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  io.emit('chat message', `**A new user has joined**`)

  socket.on('typing', msg => {
    io.emit('typing message', msg)
  })

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    io.emit('chat message', '**A user disconnected**')
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000');
});