
const InfluencerAccountsController = require('./controllers/influencerAccounts.controller');

exports.routesConfig = function (app) {
    app.post('/api/user/add', [
        InfluencerAccountsController.insert
    ]);
    app.post('/api/user/login', [
        InfluencerAccountsController.getByEmailPassword
    ]);
};