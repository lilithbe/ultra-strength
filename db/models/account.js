import mongoose,{Schema}  from "mongoose";

export const Account = new mongoose.Schema({
    userId:{type:String},
    password:{type:String},
    nickName:{type:String},
    userImage:{type:String},
    loginType:{type:String},
    isTerms:{type:Boolean},
    mobile:{type:String},



    createdAt:{type:Date},
    updatedAt:{type:Date}
})