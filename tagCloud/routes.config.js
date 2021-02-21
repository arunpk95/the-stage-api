
const TagClougController = require('./controllers/tagCloud.controller');

exports.routesConfig = function (app) {
    app.post('/api/user/:user_id/tagcloud/add', [
        TagClougController.insert
    ]);
    app.post('/api/user/:user_id/tagcloud/:tagcloud_id/delete', [
        TagClougController.delete
    ]);
    app.post('/api/user/:user_id/tagcloud/:tagcloud_id/update', [
        TagClougController.updateTagCloud
    ]);
    app.post('/api/user/:user_id/tagcloud/all', [
        TagClougController.fectchForUserId
    ]);
};
