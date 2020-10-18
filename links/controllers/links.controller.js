const LinksModel = require('../models/links.model')
const InfluencerAccountsModel = require('../../influencerAccounts/models/influencerAccount.model')
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

exports.updateLink = (req, res) => {
    userId = req.params.user_id;
    id = req.params.link_id;
    req.body.lastUpdatedOn = new Date();
    //remove if there is a try to update the URL
    delete req.body.url;
    LinksModel.updateLink(userId, id, req.body)
    .then((result) => {
        res.status(201).send({ status: "success", link: result });
        return;
    })
    .catch(err => {
        console.log(err);
        res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
    })
}

exports.fectchForUserId = (req, res) => {
    userId = req.params.user_id;
    status = req.body.status;
    LinksModel.getLinksByUserId(userId,status)
    .then((result) => {
        res.status(201).send({ status: "success", links: result });
        return;
    })
    .catch(err => {
        console.log(err);
        res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
    })
}
exports.delete = (req, res) => {
    userId = req.params.user_id;
    id = req.params.link_id;
    LinksModel.deleteLink(userId, id)
    .then((result) => {
        res.status(201).send({ status: "success", link: result });
        return;
    })
    .catch(err => {
        console.log(err);
        res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
    })
}
exports.fectchForSlug =  (req, res) => {
    slug = req.params.slug;
    if(!slug)
    {
        res.status(404).send({ status: "failed",errors: [{ code: -1, msg: "Slug is blank." }] } )
        return
    }
     InfluencerAccountsModel.getUserforLinksSlug(slug)
    .then((user) => {
        if(!user)
        {
            res.status(404).send({ status: "failed",errors: [{ code: -1, msg: "Slug is unused." }] } )
            return
        }
        LinksModel.getLinksByUserId(user._id,["active"])
        .then((result) => {
            res.status(201).send({ status: "success", links: result });
            return;
        })
        .catch(err => {
            console.log(err);
            res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
        })
    })
    .catch(err => {
        console.log(err);
        res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
    })
}


exports.updateSlug = (req, res) => {
    newslug = req.body.slug.split(" ").join("")

    if(req.body.slug === "")
    {
        res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Invalid slug input" }] });
        return
    }
    InfluencerAccountsModel.getUserforLinksSlug(newslug)
    .then((user) => {
        if(user)
        {
            res.status(404).send({ status: "failed",errors: [{ code: -1, msg: "Slug is taken." }] } )
            return
        }
        InfluencerAccountsModel.updateUser(req.params.user_id,{slug:newslug})
        .then((result) => {
            res.status(201).send({ status: "success", user: result });
            return;
        })
        .catch(err => {
            console.log(err);
            res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
        })
    })
    .catch(err => {
        console.log(err);
        res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
    })
}
