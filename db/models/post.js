import mongoose ,{Schema} from "mongoose";
import moment from 'moment'
export const Comment = new mongoose.Schema({
    targetId:Schema.Types.ObjectId,
    parrentId:Schema.Types.ObjectId,
    targetType:{type:String,default:'post'},

  
    userId:{type:String},
    content:{type:String},
    good:{type:Number,default:0},
    createdAt:{type:Date,default:moment()},
    updatedAt:{type:Date,default:moment()}
})
export const Post = new mongoose.Schema({
    thumbnail: [Schema.Types.Mixed],
    subject:{type:String},
    content:{type:String},
    userId:{type:String},
    nickName:{type:String},
    userImage:{type:String},
    category:{type:String,},
    stacks: [Schema.Types.Mixed],
    tag: [Schema.Types.Mixed],
    good:{type:Number,default:0},
    hit:{type:Number,default:0},
    createdAt:{type:Date,default:new Date()},
    updatedAt:{type:Date,default:new Date()}
})