const TagCloudsNodel = require('../models/tagCloud.model')
const InfluencerAccountsModel = require('../../influencerAccounts/models/influencerAccount.model')

exports.insert = (req, res) => {
    req.body.userId = req.params.user_id;
    TagCloudsNodel.createNewTagCloud(req.body)
    .then((result) => {
        res.status(201).send({ status: "success", tagCloud: result });
        return;
    })
    .catch(err => {
        console.log(err);
        res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
    })
}

exports.updateTagCloud = (req, res) => {
    userId = req.params.user_id;
    id = req.params.tagcloud_id;
    req.body.lastUpdatedOn = new Date();
    //remove if there is a try to update the URL
    delete req.body.url;
    TagCloudsNodel.updateTagCloud(userId, id, req.body)
    .then((result) => {
        res.status(201).send({ status: "success", tagCloud: result });
        return;
    })
    .catch(err => {
        console.log(err);
        res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
    })
}


exports.fectchForUserId = (req, res) => {
    userId = req.params.user_id;
    status = "active";
    TagCloudsNodel.getTagCloudsByUserId(userId,status)
    .then((result) => {
        res.status(201).send({ status: "success", tagClouds: result });
        return;
    })
    .catch(err => {
        console.log(err);
        res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
    })
}
exports.delete = (req, res) => {
    userId = req.params.user_id;
    id = req.params.tagcloud_id;
    TagCloudsNodel.deleteTagCloud(userId, id)
    .then((result) => {
        res.status(201).send({ status: "success", tagClouds: result });
        return;
    })
    .catch(err => {
        console.log(err);
        res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
    })
}