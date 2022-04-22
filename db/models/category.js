import mongoose,{Schema}  from "mongoose";

export const Category  = new mongoose.Schema({
    label:{type:String},
    value:{type:String},
    isUsed:{type:Boolean,default:true},
    createdAt:{type:Date,default:new Date()},
    updatedAt:{type:Date,default:new Date()}
})