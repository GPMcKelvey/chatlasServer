const db = require('../db');

const UsersModel = require('./users');
const ChatModel = require('./chat');

// UsersModel.hasMany(ChatModel);

// ChatModel.belongsTo(UsersModel);

module.exports = {
    dbConnection: db,
    models: {
        UsersModel,
        ChatModel
    }
};