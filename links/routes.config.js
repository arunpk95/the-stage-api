
const LinksController = require('./controllers/links.controller');

exports.routesConfig = function (app) {
    app.post('/api/user/:user_id/link/add', [
        LinksController.insert
    ]);
    app.post('/api/user/:user_id/link/:link_id/delete', [
        LinksController.delete
    ]);
    app.post('/api/user/:user_id/link/:link_id/update', [
        LinksController.updateLink
    ]);
    app.post('/api/user/:user_id/links/all', [
        LinksController.fectchForUserId
    ]);
    app.post('/api/links/slug/:slug', [
        LinksController.fectchForSlug
    ]);
    app.post('/api/user/:user_id/updateslug', [
        LinksController.updateSlug
    ]);
};