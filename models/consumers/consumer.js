const io = require('../sockets/sockets').io();


io.on("connection", (socket) => {
    console.log('Client connected at with socket ID: ' + socket.client.id);
    io.emit('socketClientID', socket.client.id);
    socket.on('takeIt', (data) => {
        console.log('it worked')
        console.log(data.client);
    });
});

setInterval(() => {
    io.emit('giveItToMe');

}, 3000);