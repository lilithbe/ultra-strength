import express from 'express'
import { CreateCategory, CreateProduct, DeleteCategory, DeleteImage, DeleteProduct, getProduct, ImageUpload, ListCategory, ListProduct, ListProductToCategory, MyCartList, ProductInfoImageUploadHandler, RotateCreate, UpdateAllProduct, UpdateProduct } from './Controler'
import fileUpload from "express-fileupload";


const route = express.Router()

route.use(
    fileUpload({
      createParentPath: true
    })
  );

// 카테고리 삭제시 제품에 동일한 카테고리를 사용중이라면 삭제 불가능
route.post('/category/create',CreateCategory)
route.post('/category/list',ListCategory)
route.post('/category/delete',DeleteCategory)
route.post('/list/category',ListProductToCategory)
route.post('/list/all',ListProduct)
route.post('/getitem',getProduct)
route.post('/create',CreateProduct)
route.post('/update',UpdateProduct)
route.post('/allupdate',UpdateAllProduct)
route.post('/delete',DeleteProduct)
route.post('/image/upload',ImageUpload)
route.post('/image/delete',DeleteImage)
route.post('/info/image-upload',ProductInfoImageUploadHandler)

route.post('/mycartlist',MyCartList)


route.post('/rotate-create' , RotateCreate)
module.exports = route