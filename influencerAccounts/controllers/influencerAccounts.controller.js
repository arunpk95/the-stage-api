const InfluencerAccountsModel = require('../models/influencerAccount.model');
const crypto = require('crypto');

//signup submission
//returns the id if successful
/*
possible exceptions(status:failed) - 
code    msg
-1      Internal Databse Error
0       Email Already Registered
1       Invalid Inputs
2       
*/
exports.insert = (req, res) => {
    
    
    let salt1 = crypto.randomBytes(32).toString('base64');
    let hash1 = crypto.createHmac('sha512', salt1).update(req.body.password).digest("base64");
    req.body.accessKey=salt1+hash1;
    
    //add mission ones/default ones
    req.body.comments = [{ comment: "Account Created", date: Date.now() }];
    req.body.forgotKey = "";
    req.body.activationKey = "";
    req.body.lastStatusChanged = Date.now();


    
    //0 - check if email already exists
    InfluencerAccountsModel.getInfluencerByEmailIgnoreCase(req.body.email)
        .then((result) => {
            if (result.length > 0) {
                console.log(result);
                res.status(201).send({ status: "failed", errors: [{ code: 0, msg: "Email Alreagy Registered" }] });
                return;
            }
            if (getErrors().length > 0) {
                res.status(201).send({ status: "failed", errors: getErrors() });
                return;
            }
            InfluencerAccountsModel.createInfluencer(req.body)
                .then((result) => {
                    res.status(201).send({ status: "success", id: result._id });
                    return;
                })
                .catch(err => {
                    console.log(err);
                    res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Database Error" }] });
        })

    //1 - form validation
    getErrors = () => {
        errors = []
        if (req.body.email.replace(/\s+/g, '').length < 1) {
            errors.push({ code: 1, msg: "Invalid email" })
        }
        if (req.body.name.replace(/\s+/g, '').length < 1) {
            errors.push({ code: 1, msg: "Invalid name" })
        }
        if(req.body.password !== req.body.c_password)
        {
            errors.push({ code:1, msg:"Password do not match" })
        }
        if(req.body.password.length < 6)
        {
            errors.push({ code:1, msg: "Password is not strong enough" })
        }
        return errors;
    }

    //TODO
    //send email for activation
    //Validate unique email case sensitivity, dot and space(invalid and duplicate)    
};

//login submission
//returns the document of influencerAccount
/*
possible exceptions(status:failed) - 
code    msg                                 Comment
-1      Internal Databse Error
0       Email Not Registered                Yet to be done
1       Invalid Inputs
2       Invalid credentials
*/
exports.getByEmailPassword = (req, res) => {
        //added in top to check password empty and to avoing unwanted DB connections
        //1 - form validation
        getErrors = () => {
            errors = []
            if (req.body.email.replace(/\s+/g, '').length < 1) {
                errors.push({ code: 1, msg: "Required Email" })
            }
            if (req.body.password.length < 1) {
                errors.push({ code: 1, msg: "Required password" })
            }
            console.log(errors);
            return errors;
        }
        
        if (getErrors().length > 0) {
            res.status(201).send({ status: "failed", errors: getErrors() });
            return;
        }
        
    
    InfluencerAccountsModel.getInfluencerByEmailIgnoreCase(req.body.email)
        .then((users) => {
            if (!users[0]) {
                res.status(201).send({ status: "failed", errors: [{ code: 0, msg: "Email Not Registered" }] });
                return;
            }
            let passwordFields = users[0].password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
            console.log(hash);
            if (hash === passwordFields[1]) 
            {
                res.status(201).send({ status: "success", influencerAccount: {"email":users[0].email, "accessKey":users[0].accessKey,"id":users[0].id} });
                return;
            }
            else
            {
                res.status(201).send({ status: "failed", errors: [{ code: 2, msg: "Invalid Credentials" }] });
                return;
            }
            
            // InfluencerAccountsModel.getInfluencerByEmailPassword(req.body.email, req.body.password)
            //     .then((result) => {
            //         res.status(201).send({ status: "success", influencerAccount: result });
            //         return;
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Databse Error" }] });
            //     })
        })
        .catch((err) => {
            console.log(err);
            res.status(201).send({ status: "failed", errors: [{ code: -1, msg: "Internal Databse Error" }] });
        })
}













