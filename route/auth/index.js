import express from 'express'
import { getProfile, getUserInfo, idCheck, setProfile, signIn, signUp, tokenCheck } from './Controler'

const route = express.Router()
route.post('/signup',signUp)
route.post('/signin',signIn)
route.post('/set-profile',setProfile)
route.post('/get-profile',getProfile)
route.post('/id-check',idCheck)
route.post('/token-check',tokenCheck)
route.post('/get-user-info',getUserInfo)

module.exports = route
