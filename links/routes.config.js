
const LinksController = require('./controllers/links.controller');

exports.routesConfig = function (app) {
    app.post('/api/user/:user_id/link/add', [
        LinksController.insert
    ]);
    // app.post('/api/user/:user_id/link/:id/delete', [
    //     LinksController.delete
    // ]);
    // app.post('/api/user/:user_id/link/:id/update', [
    //     LinksController.update
    // ]);
    // app.post('/api/user/:user_id/links/all', [
    //     LinksController.fectchForUserId
    // ]);
    // app.post('/api/user/:user_id/links/slug', [
    //     LinksController.fectchForSlug
    // ]);
};