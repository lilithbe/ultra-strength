import jwt from 'jsonwebtoken'
import { model } from '../../db'
import moment from 'moment'
// 생성
const tagMaker = async(content)=>{
    let a = content.split('#')
    a.splice(0,1)
    const result =[]
    for (let i = 0; i < a.length; i++) {
        const tag=a[i].replace('</',' ').replace(',',' ').split(' ')[0]
        result.push(tag)
    }
    return result
}
export const Create = async (req, res) => {
    try {
        // const userData = jwt.verify(req.headers.authorization, process.env.SECRET_KEY) //토큰검증및 유저정보
 
        if(req.isLogin===true){
            await model('post').create({ ...req.body,tag:await tagMaker(req.body.content), userid:req.user.userId,nickName:req.user.nickName,userImage:req.user.userImage, createdAt: new Date(), updatedAt: new Date() }).then((data) => {
                res.status(200).json({status:true,data:data})
            })
        }else{
            res.status(200).json({status:false})
        }
       
    } catch (error) {
        console.log(error)
        res.status(200).json({ status: false })
    }
}
// 수정
export const Update = async (req, res) => {
    await model('post').findOneAndUpdate({ _id: req.body._id }, { ...req.body, updatedAt: new Date() }).then((data) => {
     
        data.status = true
        res.status(200).json(data)
    })
}
// 삭제
export const Delete = async (req, res) => {
    await model('post').findByIdAndDelete(req.body.id).then((data) => {
        data.status = true
        res.status(200).json(data)
    })
}
export const getPostAll = async (req, res) => {
    await model('post').find(req.body).then((data) => {
        data.status = true
        res.status(200).json(data)
    })
}

export const getMyPost = async (req, res) => {
    await model('post').find(req.body).then((data) => {
        data.status = true
        res.status(200).json(data)
    })
}

// 특정카테고리 반환
export const getPostCategory = async (req, res) => {
    console.log(req.body)
    await model('post').find().where('category').equals(req.body.category).sort({'updatedAt': -1}).then((data) => {  
        console.log(data)   
        res.status(200).json({list:data,status:true})
    })
}
// 검색어 반환
export const getPostSearch = async (req, res) => {
    await model('post').find(req.body).then((data) => {
        data.status = true
        res.status(200).json(data)
    })
}
// 포스트 반환
export const getPostOne = async (req, res) => {
    await model('post').findById(req.body._id).then((data) => {
   
        res.status(200).json(data)
    })
}

export const CategoryCreate =async (req,res)=>{
    await model('category').create(req.body).then((data) => {
        res.status(200).json(data)
    })
}
export const CategoryDelete =async (req,res)=>{
    await model('category').findByIdAndDelete(req.body._id).then(async() => {
        await model('post').deleteMany().where('category').equals(req.body.value).then((data) => {
            console.log(data)
            res.status(200).json({status:true})
        })
    })
}

export const CategoryUpdate =async (req,res)=>{
    await model('category').findByIdAndUpdate(req.body._id,req.body ).then(async(oldData) => {
        if(req.body.value!==oldData.value){
            await model('post').updateMany({category:oldData.value},{category:req.body.value}).then((data) => {                
                res.status(200).json({status:true})
            })
        }else{
            res.status(200).json({status:true})
        }
        
    })
}


// ------------------------------------------- Comment Querys -------------------------------------------
export const CommentCreate =async (req,res)=>{
    try {
        if(req.isLogin){
            await model('comment').create({...req.body,userId:req.user.userId,}).then((data) => {
                console.log(moment().format('YYYY-MM-DD hh:mm:ss'))
                res.status(200).json(data)
            })
        }else{
            res.status(200).json({status:false,message:'로그인 이후 이용 가능합니다.',errorCode:'isLogin'})
        }
       
    } catch (error) {
        res.status(200).json({status:false})
    }
   
}
export const CommentDelete =async (req,res)=>{
    try {
        if(req.isLogin){
            await model('comment').findByIdAndDelete(req.body).then((data) => {
                res.status(200).json(data)
            })
        }else{
            res.status(200).json({status:false,message:'로그인 이후 이용 가능합니다.',errorCode:'isLogin'})
        }
       
    } catch (error) {
        res.status(200).json({status:false})
    }
 
}
export const CommentUpdate =async (req,res)=>{
    try {
        if(req.isLogin){
            await model('comment').findByIdAndUpdate(req.body).then((data) => {
                res.status(200).json(data)
            })
        }else{
            res.status(200).json({status:false,message:'로그인 이후 이용 가능합니다.',errorCode:'isLogin'})
        }
        
    } catch (error) {
        res.status(200).json({status:false})
    }
    
}
export const CommentList =async (req,res)=>{
    try {
        if(req.isLogin){
            await model('comment').find(req.body).sort({'updatedAt': -1}).then((data) => {
                res.status(200).json(data)
            })
        }else{
            res.status(200).json({status:false,message:'로그인 이후 이용 가능합니다.',errorCode:'isLogin'})
        }
      
    } catch (error) {
        res.status(200).json({status:false})
    }
   
}

