const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");
const cors = require('cors');
const ngrok = require("@ngrok/ngrok");

const app = express();
const server = http.createServer(app);
// const io = new Server(server);
const link = 'https://7519-49-0-87-150.ngrok-free.app';

const io = new Server(server,{
    cors: {
      origin: link,
      methods: ["GET", "POST"]
    }
  });
  
app.use(cors({
    origin: link
}));

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, 'field.html'));
});


io.on("connection", (socket) => {
    console.log("A user connected");
    socket.emit("message", "Hello from server!");

    socket.on("message", (msg) => {
console.log('msg',msg)
    });
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});


server.listen(7777, () => {
    console.log('server running at http://localhost:7777')
});

(async function () {
	const listener = await ngrok.connect({
		addr: link,
		authtoken: '2Ng1GDirVyNZ8rPhUgqhr78ZspR_4EvdRptmmcAK6y1K56kyL',
	});

	console.log(`Ngrok URL: ${listener}`);
})();
