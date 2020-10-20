var multer = require('multer');

var upload = multer({ dest: 'uploads/' })

exports.uploadMedia = (req, res) => {
    expectedType = req.body.type; //possible values -> image
    uploadedFor = req.body.uploadedFor;//possible values -> linkThumb, linksTopThumb, pageBG
    console.log(expectedType)
    upload.single('myimg');
    res.status(201).send({ status: "success" });

}