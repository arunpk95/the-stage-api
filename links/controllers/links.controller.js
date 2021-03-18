const LinksModel = require('../models/links.model')
const mongoose = require('../../common/mongoose.service')

exports.insert = (req, res) => {
    req.body.userId = req.params.user_id;
    LinksModel.createNewLink(req.body)
    .then((result) => {
        res.status(201).send({ status: "success", link: result });
        return;
    })
    .catch(err => {
        console.log(err);
        res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
    })
}