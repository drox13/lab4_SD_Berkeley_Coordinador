const express = require('express');
const cors = require('cors');
const PORT = 9000;

class Server {
    constructor() {
        this.app = express();
        this.port = PORT;
        this.server = require("http").createServer(this.app);
        this.io = require("./sockets/sockets").initialize(this.server);
        require('./consumers/consumer');
        this.middleware();
        this.routes();
        this.socket();
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/', require('../routes/monitor'));
    }

    socket() {
        // this.io.on("connection", (socket) => {
        //     console.log('Client connected at with socket ID: ' + socket.client.id);
        //     this.io.emit('socketClientID', socket.client.id);
        //     this.io.on('takeIt', (data) => {
        //         console.log('it worked')
        //         console.log(data.client);
        //     });
        // });
        // setInterval(() => {
        //     this.io.emit('giveItToMe');
        // }, 3000)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server on! PORT ${this.port}`);
        });
    }
}

module.exports = Server