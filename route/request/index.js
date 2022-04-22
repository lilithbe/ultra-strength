import express from 'express'
import { RequsetCreate, RequsetMyList } from './Controler'

const route = express.Router()
route.use('/create', RequsetCreate)

route.use('/my-list', RequsetMyList)

module.exports = route