import mongoose from "mongoose";
import env from 'dotenv'

import { Account } from "./models/account";
import { Comment, Post } from "./models/post";
import { Category } from "./models/category";
import { Product, ProductCategory, ProductImage, Rotate } from "./models/product";
import { Config } from "./models/config";
import { RequestContent } from "./models/request";


env.config()
const mongodbUrl = process.env.MONGODB
const getModel = (modelName) => {
    switch (modelName) {
        case 'config':
            return Config
        case 'account':
            return Account
        case 'post':
            return Post
        case 'comment':
            return Comment
        case 'category':
            return Category
        case 'product':
            return Product
        case 'product_category':
            return ProductCategory
            
        case 'rotate':
            return Rotate
            case 'product_image':
            return ProductImage
        case 'request':
            return RequestContent

        default:
            break;
    }
}

export const model = (modelName) => {
    return mongoose.model(modelName, getModel(modelName))
}

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            autoIndex: true
        })
        console.log(`MongoDB connected : ${con.connection.host}`)
    } catch (error) {
        console.log(`Error : ${error}`)
        process.exit(1)
    }
}