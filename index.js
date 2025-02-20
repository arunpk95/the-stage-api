var express = require("express");
var app = express();
const bodyParser = require('body-parser');
var UploadFile = require('./common/file.upload')


const InfluencerAccountRouter = require('./influencerAccounts/routes.config');
const LinksRouter = require('./links/routes.config')
const TagCloudRouter = require('./tagCloud/routes.config')
app.use(bodyParser.json());
//for forms
//app.use(express.urlencoded());

InfluencerAccountRouter.routesConfig(app);
LinksRouter.routesConfig(app);
TagCloudRouter.routesConfig(app);

const path = require('path');

//returns html pages for login and signup
app.get('/inf/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/influencers/signup.html'));
});
app.get('/inf/login', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/influencers/login.html'))
});

// app.post('/api/uploadFile', [
//     UploadFile.uploadMedia
// ]);

//since heroku adds dynamic port. change the env port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});

//https://www.toptal.com/nodejs/secure-rest-api-in-nodejs