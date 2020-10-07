var express = require("express");
var app = express();
const bodyParser = require('body-parser');


const InfluencerAccountRouter = require('./influencerAccounts/routes.config');

app.use(bodyParser.json());

InfluencerAccountRouter.routesConfig(app);


const path = require('path');

//returns html pages for login and signup
app.get('/inf/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/influencers/signup.html'));
});
app.get('/inf/login', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/influencers/login.html'))
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

//https://www.toptal.com/nodejs/secure-rest-api-in-nodejs