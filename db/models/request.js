import mongoose,{Schema}  from "mongoose";

export const RequestContent = new mongoose.Schema({
    defaultId:{type:String},

    isLogin:{type:Boolean},
    userData:Schema.Types.Mixed,
   
    content:{type:String},
    mobile:{type:String},

    isAdminCheck:{type:Boolean,default:false},
    adminComment:{type:String,default:''},
    cartList:[Schema.Types.Mixed],

 
    createdAt:{type:Date,default:new Date()},
    updatedAt:{type:Date,default:new Date()}
})