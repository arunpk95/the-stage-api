var express = require("express");
var app = express();
const bodyParser = require('body-parser');

//checking the  push test01 branch -> change 1
const InfluencerAccountRouter = require('./influencerAccounts/routes.config');
const LinksRouter = require('./links/routes.config')

app.use(bodyParser.json());

InfluencerAccountRouter.routesConfig(app);
LinksRouter.routesConfig(app);

const path = require('path');

//returns html pages for login and signup
app.get('/inf/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/influencers/signup.html'));
});
app.get('/inf/login', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/influencers/login.html'))
});

//since heroku adds dynamic por. change the env port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});

//https://www.toptal.com/nodejs/secure-rest-api-in-nodejs