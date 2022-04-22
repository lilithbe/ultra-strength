import { model } from "../../db"
import { multipleUpload, singleUpload } from "../../lib/file"
import AdmZip from 'adm-zip'
import {v4} from 'uuid'
import fs from 'fs'

export const RequsetCreate = async(req,res)=>{
    try {
       const requestData= await model('request').create({
            isLogin:req.isLogin,
            userData:req.user,
            ...req.body
        })
        res.status(200).json({ reqName: 'Requset Create',status:true,data:requestData})
    } catch (error) {
        res.status(200).json({ reqName: 'Requset Create',status:false,error:error})
    }
}
export const RequsetMyList = async(req,res)=>{
    try {
       const requestData= await model('request').find(req.body)
        res.status(200).json({ reqName: 'Requset My List',status:true,data:requestData})
    } catch (error) {
        res.status(200).json({ reqName: 'Requset My List',status:false,error:error})
    }
}
