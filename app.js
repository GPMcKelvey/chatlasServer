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
const server = http.createServer();
const io = socketio(server);

//middleware
app.use(middleware.CORS);
app.use(Express.json());
app.use(router);

//socket.io
io.on('connection', (socket) => {
    console.log("New connection.");

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});

//endpoints
app.use('/users', controllers.userController);
//app.use('/chat', controllers.chatController);


//server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
try{
    dbConnection.authenticate()
        .then(async () => await dbConnection.sync())
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`[server]: App is listening on ${process.env.PORT}.`);
            });
        });
} catch (err) {
        console.log(`[server]: Server crashed. Error = ${err}`);
    };
