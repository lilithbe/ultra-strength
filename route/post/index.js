import express from 'express'
import { CategoryCreate, CategoryDelete, CategoryUpdate, CommentCreate, CommentDelete, CommentList, CommentUpdate, Create, Delete, getMyPost, getPostAll, getPostCategory, getPostOne, getPostSearch, Update } from './Controler'

const route = express.Router()
route.post('/create',Create)
route.post('/update',Update)
route.post('/delete',Delete)
route.post('/get-all',getPostAll)
route.post('/get-category',getPostCategory)
route.post('/get-one',getPostOne)
route.post('/get-search',getPostSearch)
route.post('/get-my-post',getMyPost)
route.post('/category/create',CategoryCreate)
route.post('/category/delete',CategoryDelete)
route.post('/category/update',CategoryUpdate)
route.post('/comment/create',CommentCreate)
route.post('/comment/list',CommentList)
route.post('/comment/update',CommentUpdate)
route.post('/comment/delete',CommentDelete)
module.exports = route