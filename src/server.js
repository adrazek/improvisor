const io = require('socket.io')();

var clients = []
var scores = [0, 0]
io.on('connection', (client) => {

	clients.push(client)

	client.on('currentState', (state) => { clients.forEach(c => { c.emit('currentState', state) }) })

	client.on('next', (route) => { clients.forEach(c => { c.emit('next', route, scores) }) })

  client.on('plusOne', (teamIndex, animate=false) => {
		scores[teamIndex]++
		clients.forEach(c => {
	  	c.emit('plusOne', teamIndex, animate);
		})
  });

	client.on('minusOne', (teamIndex) => {
		scores[teamIndex]--
		clients.forEach(c => {
	  	c.emit('minusOne', teamIndex);
		})
	});

	client.on('theme', (theme) => {
		clients.forEach(c => {
			c.emit('theme', theme)
		})
	});

});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
