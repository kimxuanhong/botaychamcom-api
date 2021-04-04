const UserController = require('./UserController');

const RootController = (app) => {
    app.use('/users', UserController);
}

module.exports = RootController;