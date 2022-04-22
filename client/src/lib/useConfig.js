import { useEffect } from "react"
import { AUTH_TOKEN_CHECK } from "../common"

import { postApi } from "./axios"
import {v4} from 'uuid'
export const useConfig = (setIsLoading, setLogin, setConfig, setCategory,setProduct) => {
  useEffect(() => {

      const d_id = localStorage.getItem('DEFAULT_ID')
      const myCart=  localStorage.getItem('CART_OBJECT')

      if(d_id!==null && myCart!==null){        
        postApi(setIsLoading, AUTH_TOKEN_CHECK, async (res) => {     
          if (res.data.status===true) {           
            if (res.data.isLogin===true) {
              setLogin(res.data.userData)
            }
            if(res.data.isCart===true){             
              setProduct({myCartList:res.data.myCartList,allList:res.data.products,category:res.data.product_category,rotate:res.data.rotate,images:res.data.productImages})        
            }else{
              setProduct({myCartList:[],allList:res.data.products,category:res.data.product_category,rotate:res.data.rotate,images:res.data.productImages})
            }
            await setConfig(res.data.config)
            await setCategory({ category: res.data.category })
          }else{
            console.log(res)
            console.log('getConfig Error!!')
          }
        },{myCart:JSON.parse(myCart),d_id:d_id})

      }else{
        const setId = v4()
        localStorage.setItem('DEFAULT_ID',setId)
        localStorage.setItem('CART_OBJECT',JSON.stringify([]))
        localStorage.setItem('CART_LIST',JSON.stringify([]))
        postApi(setIsLoading, AUTH_TOKEN_CHECK, async (res) => {     
          if (res.data.status===true) {           
            if (res.data.isLogin===true) {
              setLogin(res.data.userData)
            }else{
  
            }
            console.log(res)
            if(res.data.isCart===true){             
              setProduct({myCartList:res.data.myCartList,allList:res.data.products,category:res.data.product_category,rotate:res.data.rotate,images:res.data.productImages})        
            }else{
              setProduct({myCartList:[],allList:res.data.products,category:res.data.product_category,rotate:res.data.rotate,images:res.data.productImages})
            }
            await setConfig(res.data.config)
            await setCategory({ category: res.data.category })
          }else{
            console.log(res)
            console.log('getConfig Error!!')
          }
        },{myCart:[],d_id:setId})

      }

  
    return () => {

    }
  }, [setIsLoading, setLogin])

}