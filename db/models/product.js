import mongoose,{Schema}  from "mongoose";

export const ProductCategory = new mongoose.Schema({
    label:{type:String},
    value:{type:String},
    description:{type:String},
    options:[Schema.Types.Mixed],
    isUsed:{type:Boolean,default:true},
    createdAt:{type:Date,default:new Date()},
    updatedAt:{type:Date,default:new Date()}
})

export const Product = new mongoose.Schema({
    mainLabel:{type:String},
    subLabel:{type:String},
    modelLabel:{type:String},

    label:{type:String},




    categoryId:{type:String},
    badge:[String],
    price:{type:Number},
    count:{type:Number},
    delivery:{type:String},
    installType:{type:String},

 

    images: Schema.Types.Mixed,
    mainImageIndex:{type:Number},


   
    // 선택형 옵션
    isSelectOption: {type:Boolean},
    selectOptionType: {type:String},
    selectOptionCount: {type:Number},
    selectOptionInfomation:[Schema.Types.Mixed],
    selectSingleOptionList: [Schema.Types.Mixed],
    selectMultipleOptionList: [Schema.Types.Mixed],
    //입력형 옵션
    isInputOption: {type:Boolean},
    inputOptions:[Schema.Types.Mixed],
    inputOptionCount: {type:Number},
    inputOptionList:[Schema.Types.Mixed],


    productInfo:{type:String},
    productInfoFiles:[Schema.Types.Mixed],

    isRotate:{type:Boolean,default:false},
    rotate:{type:String},
    rotateId:{type:String},

    isUsed:{type:Boolean,default:true},

    createdAt:{type:Date,default:new Date()},
    updatedAt:{type:Date,default:new Date()}
})

export const Rotate =  new mongoose.Schema({
    label:{type:String},
    value:{type:String},
    currnetUseProducts:[String],
    createdAt:{type:Date,default:new Date()},
    updatedAt:{type:Date,default:new Date()}
})


export const ProductImage = new mongoose.Schema({
    label:{type:String},
    src:{type:String},
    currnetUseProducts:[String],
    size:{type:Number},
    width:{type:Number},
    height:{type:Number},
    createdAt:{type:Date,default:new Date()},
    updatedAt:{type:Date,default:new Date()}
})

