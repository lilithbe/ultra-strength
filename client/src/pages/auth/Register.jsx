import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AUTH_SIGNUP } from '../../common'
import PageHeader from '../../layout/main/PageHeader'
import { postApi } from '../../lib/axios'
import { setLogin } from '../../redux'

const Register = () => {
    const history = useHistory()
    const [authState, setAuthState] = useState({
        userId:'',
        password:'',
        confirm:'',
        nickName:'',
        isTerms:false,
        loginType:'local',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [messageState, setMessageState] = useState(
        {
            isError:false,
            message:''
        }
    )
    const submitHandler = (e) => { 
        e.preventDefault()
        if(authState.isTerms){
            postApi(setIsLoading,AUTH_SIGNUP,(res)=>{
                console.log(res.data.status)
                if(res.data.status){
                    history.push('/auth/login')
                    setMessageState({
                        isError:false,
                        message:''
                    })
                }else{
                    setMessageState({
                        isError:true,
                        message:res.data.message
                    })
                }
            
            },authState)
        }else{
            setMessageState({
                isError:true,
                message:'약관을 동의해주세요.'
            })
        }
     }
  return (
    <div>
            <PageHeader pageTitle='Login' breadcrumbList={[{ label: 'home', to: '/', isCurrent: false }, { label: 'Login', to: '/about', isCurrent: true }]} />
            <div className='d-flex justify-content-center my-1'>
                <div className="p-1 shadow-2 border-round w-full lg:w-5 md:w-10 sm:w-12">
                    <div className="text-center mb-1">
                        <div className="text-900 text-3xl font-medium mb-1">Ultra Strength Login</div>
                        <span className="text-600 font-medium line-height-2">Don't have an account?</span>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                        <h5 className='text-center'>Local Sign Up</h5>
                        <form onSubmit={submitHandler}>
                        <label htmlFor="userId" className="block text-900 font-medium mb-2">Email</label>
                        <InputText required id="userId" type="text" className="p-inputtext-sm w-full mb-2" value={authState.userId} onChange={(e) => {
                            setAuthState({ ...authState, userId: e.target.value })
                        }} />
                        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                        <InputText required id="password" type="password" className="p-inputtext-sm w-full mb-2" value={authState.password} onChange={(e) => {
                            setAuthState({ ...authState, password: e.target.value })
                        }} />
                         <label htmlFor="confirm-password" className="block text-900 font-medium mb-2">Confirm Password</label>
                        <InputText required id="confirm-password" type="password" className="p-inputtext-sm w-full mb-2" value={authState.confirm} onChange={(e) => {
                            setAuthState({ ...authState, confirm: e.target.value })
                        }} />
                         <label htmlFor="nick-name" className="block text-900 font-medium mb-2">Nick Name</label>
                        <InputText required id="nick-name" type="text" className="p-inputtext-sm w-full mb-2" value={authState.nickName} onChange={(e) => {
                            setAuthState({ ...authState, nickName: e.target.value })
                        }} />
                          <div className="flex align-items-center justify-content-between my-1">
                            <div className="flex align-items-center">                               
                                <Button className='p-button-sm p-0 p-button-text'>약관 보기</Button>
                            </div>
                            <div className="flex align-items-center">
                                <Checkbox inputId="rememberme1" binary className="mr-2" onChange={e => setAuthState({ ...authState, isTerms: e.checked })} checked={authState.isTerms} />
                                <label htmlFor="rememberme1">약관 동의</label>
                            </div>
                        </div>
                     
                        <Button type="submit" label="Sign Up" icon="pi pi-user" className="p-button-sm w-full" />
                    </form>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                            <h5 className='text-center'>Social Sign Up</h5>
                            <label className="block text-900 font-medium mb-2">Google</label>
                            <Button label="Google" icon="pi pi-google" className="p-button-sm w-full mb-2" />
                            <label className="block text-900 font-medium mb-2">Kakao</label>
                            <Button label="Kakao" icon="pi pi-kakao" className="p-button-sm w-full mb-2" />
                            <label className="block text-900 font-medium mb-2">Naver</label>
                            <Button label="Naver" icon="pi pi-naver" className="p-button-sm w-full mb-2" />
                            <label className="block text-900 font-medium mb-2">Instagram</label>
                            <Button label="Instagrem" icon="pi pi-instagram" className="p-button-sm w-full mb-2" />
                            <label className="block text-900 font-medium mb-2">Facebook</label>
                            <Button label="Facebook" icon="pi pi-facebook" className="p-button-sm w-full mb-2" />
                        </div>
                    </div>
                    {messageState.isError?
                     <div>
                     Error:{messageState.message}
                 </div>:null}
                   
                  
                </div>
            </div>
        </div>
  )
}
const mapStateToProps = (state) => { 
    return{

    }
 }
 const mapDispatchToProps = (dispatch) => { 
     return{
        setLogin:(data)=>dispatch(setLogin(data))
     }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Register)