require('dotenv').config();

//imports
const Express = require('express');
const dbConnection = require('./db');
const controllers = require('./controllers');
const middleware = require('./middleware');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

//instantiation & socket.io
const app = Express();
const server = http.createServer(app);
const io = socketio(server);

//socket.io
io.on('connectio', (socket) => {
    console.log("New connection.");

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});



//middleware
app.use(middleware.CORS);
app.use(Express.json());
app.use(router);

//endpoints
app.use('/users', controllers.userController);
app.use('/chat', controllers.chatController);


server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
