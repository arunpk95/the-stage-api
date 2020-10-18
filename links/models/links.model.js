  
const mongoose = require('../../common/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const linksSchema = new Schema({
    userId : String,
    displayText : String,
    url: String,
    scheduled:Boolean,
    scheduledFrom:String,
    scheduledTo:String,
    scheduledTimezone:String,
    hasThumb:Boolean,
    thumbUrl:String,
    views:{type:Number,default:0},
    engagement:{type:Number,default:0},
    status:{type:String,default:"inactive"},
    lastUpdatedOn:{ type: Date, default: Date.now}
});

const LinksSchema = mongoose.model('links',linksSchema);

exports.createNewLink = (linkData) => {
    const link = new LinksSchema(linkData);
    return link.save();
}
exports.getLinksByUserId = (userId,status) => {
    const links = LinksSchema.find({"userId":userId,"status":{$in:status}});
    return links;
}
exports.updateLink = (userId,id,linkData) => {
    const result =  LinksSchema.findOneAndUpdate ({_id:id,  userId:userId},linkData,{new: true});
    return result;    
}
exports.deleteLink = ( userId, id) => {
    const result = LinksSchema.findOneAndUpdate({_id:id, userId:userId},{"status":"archieved"},{new: true});
    return result;
}