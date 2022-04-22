import mongoose,{Schema}  from "mongoose";

export const Config = new mongoose.Schema({
    label:{type:String},
    value:{type:String},

    mainPageOption:Schema.Types.Mixed,
    adminPageOption:Schema.Types.Mixed,

    about:Schema.Types.Mixed,
    mainCarousel:Schema.Types.Mixed,
    trainers:Schema.Types.Mixed,
    services:Schema.Types.Mixed,
    workingTime:Schema.Types.Mixed,
    terms:{type:String},
    companyInfomation:Schema.Types.Mixed,


    createdAt:{type:Date,default:new Date()},
    updatedAt:{type:Date,default:new Date()}
})