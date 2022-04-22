import React, { useEffect, useState } from 'react'
import {useLocation , useHistory} from 'react-router-dom'
import AdminLayout from './admin/AdminLayout'
import MainLayouy from './main/MainLayouy'
const LayoutDivider = ({children}) => {
  const location = useLocation()

  const [mainpath , setMainpath ] = useState('main')





  
  
  useEffect(() => {
      const mainpath = location.pathname.split('/')[1]
      if(mainpath==='admin'){
        setMainpath('admin')
      }else{
        setMainpath('main')
      }
    return () => {
      setMainpath('main')
    }
  }, [location])

  if(mainpath==='admin'){
    return (
      <AdminLayout>{children}</AdminLayout>
     
    )
  }else{
    return (
      <MainLayouy>{children}</MainLayouy>
    )
  }

}

export default LayoutDivider