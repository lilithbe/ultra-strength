import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()
export const AuthCheck=async(req,res,next)=>{

    if(req.headers.authorization!==undefined){
 
       try {
        const userData = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
        
                if(userData){
                    console.log('토큰 유효')
            req.isLogin=true
            req.user=userData
        }else{
            console.log('토큰 없음')
            req.user={}
            req.isLogin=false
        }
       } catch (error) {
           console.log('토큰만료')
        req.user={}
        req.isLogin=false
       }
    }else{
        console.log('토큰 없음')
        req.user={}
        req.isLogin=false
    }
   
    await next()
}