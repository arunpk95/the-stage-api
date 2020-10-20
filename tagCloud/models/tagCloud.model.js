const mongoose = require('../../common/mongoose.service').mongoose;
const Schema = mongoose.Schema;


const TagCloudSchema = new Schema({
    userId : String,
    name : String,
    text: String,
    status:{type:String,default:"active"},
    lastUpdatedOn:{ type: Date, default: Date.now}
})

const TagCloud = mongoose.model('tagclouds',TagCloudSchema);

exports.createNewTagCloud = (data) => {
    const tg = new TagCloud(data);
    return tg.save();
}
exports.getTagCloudsByUserId = (userId,status) => {
    const tgs = TagCloud.find({"userId":userId,"status":{$in:status}});
    return tgs;
}
exports.updateTagCloud = (userId,id,data) => {
    const result =  TagCloud.findOneAndUpdate ({_id:id,  userId:userId},data,{new: true});
    return result;    
}
exports.deleteTagCloud = ( userId, id) => {
    const result = TagCloud.findOneAndUpdate({_id:id, userId:userId},{"status":"deleted"},{new: true});
    return result;
}