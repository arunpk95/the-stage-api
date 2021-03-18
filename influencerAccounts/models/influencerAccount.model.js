const mongoose = require('../../common/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const crypto = require('crypto');


const influencerAccountSchema = new Schema({
    name: String,
    email: String,
    password: String,
    activationKey: String,
    forgotKey: String,
    lastStatusChanged: Date,
    comments: [{ comment: String, date: Date }],
    status: String,
    createdDate: { type: Date, default: Date.now },
    accessKey: String,
    isBusiness: String,
    countryCode: Number,
    phone: String
});

const InfluencerAccount = mongoose.model('influencerAccounts', influencerAccountSchema);

exports.createInfluencer = (userData) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(userData.password).digest("base64");
    userData.password = salt + "$" + hash;
    
    const user = new InfluencerAccount(userData);

    return user.save();
};

exports.getInfluencerByEmailIgnoreCase =  (email) => {
    const result =  InfluencerAccount.find({ "email": { $regex: new RegExp("^" + email.toLowerCase(), "i") } });
    return result;
};

exports.getInfluencerById =  (id) => {
        const result =  InfluencerAccount.findById (id);
        return result;    
};


