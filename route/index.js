import express from 'express'
import Auth from './auth'
import Post from './post'
import Config from './config'
import Product from './product'
import Requset from './request'
const route = express.Router()
route.use('/auth', Auth)
route.use('/config',Config)
route.use('/post', Post)
route.use('/product' ,Product)
route.use('/request',Requset)

module.exports = route