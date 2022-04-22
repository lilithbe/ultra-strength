import jwt from 'jsonwebtoken'
import {model} from '../../db'
import bcrypt from 'bcrypt'
import { password_regexp1 } from '../../common/regExp'
const tokenTime =300000
export const tokenCheck=async(req,res)=>{
    try {
        const category =await model('category').find()
        const config =await model('config').findOne({label:'main'})
        const products =await model('product').find()
        const rotate =await model('rotate').find()
        const product_category =await model('product_category').find()
        const product_images =await model('product_image').find()
         const myCart = async(myCart)=>{
            const result =[]
            for (let i = 0; i <   myCart.length; i++) {   
                const item = await model('product').findById({_id:myCart[i]._id})     
                if(item){
                    await result.push({...item._doc,myOptions:myCart[i].myOptions})
                }          
              
            }
            return result
         }
         if(req.body.myCart.length>0){            
            const myCartList=await myCart(req.body.myCart)      
            res.status(200).json({status:true,rotate:rotate,productImages:product_images, category:category,config:config,isLogin:req.isLogin,userData:req.user,isCart:true,myCartList:myCartList,products:products,product_category:product_category})

         }else{
            res.status(200).json({status:true,rotate:rotate,productImages:product_images,category:category,config:config,isLogin:req.isLogin,userData:req.user,isCart:false,products:products,product_category:product_category})
         }
     
       
    } catch (error) {
        console.log(error)
         res.status(200).json({status:false,error:error })
    }
}

export const idCheck=async(req,res)=>{
    await model('account').findOne(req.body).then((user)=>{
        if(user){
            res.status(200).json({status:false})
        }else{
            res.status(200).json({status:true})
        } 
    })
}
/**
 * 회원가입
 */
 export const signUp=async(req,res)=>{
    try {
        console.log(req.body.password)
        console.log(password_regexp1.test(req.body.password))
        if(password_regexp1.test(req.body.password)){
            await model('account').findOne({userId:req.body.userId}).then((user)=>{
                if(user){
                    res.status(200).json({status:false,message:'아이디가 동일한 계정이 있습니다.'})
                }else{
                    bcrypt.hash(req.body.password, 10, async(err, hash) => {
                        const userData={...req.body,password:hash,createdAt:new Date(),updatedAt:new Date()}
                        await model('account').create(userData).then(async(data)=>{
                            const getData = {...data._doc,
                            }
                            delete getData.password
                            let token = jwt.sign(
                                {
                                    ...getData,
                                    exp: Math.floor(Date.now()/1000) + tokenTime,
                                    iat: Math.floor(Date.now()/1000),
                                },
                                process.env.SECRET_KEY
                            );
                            res.status(200).json({...getData,token:token,status:true})
                        })
                    })
                } 
            })
        }else{
            res.status(200).json({message:'비밀번호 정규식 체크',status:false})
        }
      
       
       
    } catch (error) {
        res.status(200).json({error,status:false})
    }
   
}
/**
 * 로그인
 */
 export const signIn=async(req,res)=>{
    try {
 
        await model('account').findOne({userId:req.body.userId}).then((user)=>{
            if(user){
                
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const getData = {...user._doc,
                        exp: Math.floor(Date.now()/1000) + tokenTime,
                        iat: Math.floor(Date.now()/1000),
                    }
                    delete getData.password
                    let token = jwt.sign(
                        {
                            ...getData
                        },
                        process.env.SECRET_KEY
                    );
                    res.status(200).json({...getData,token:token,status:true})
                }else{
                    res.status(200).json({status:false,message:'비밀번호가 틀립니다. 다시 확인해주세요.'})
                }
            }else{
                res.status(200).json({status:false,message:'입력한 아이디를 찾을수 없습니다.'})
            }  
        })
    } catch (error) {
     
        res.status(200).json({status:false,message:'Error',error:error})
    }
   
}
/**
 * 프로필 업데이트
 */
 export const setProfile=async(req,res)=>{
    await model('account').updateOne({...req.body,updatedAt:new Date()}).then((data)=>{
        res.status(200).json({data,status:true})
    })
}
/**
 * 프로필 정보 가져오기
 */
export const getProfile=async(req,res)=>{
    await model('account').findOne(req.body).then((data)=>{
        res.status(200).json({data,status:true})
    })
}

export const getUserInfo = async(req,res)=>{
    await model('account').findOne(req.body,{password:0,loginType:0,}).then((data)=>{  
        res.status(200).json({data,status:true})
    })
}