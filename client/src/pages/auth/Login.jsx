import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AUTH_SIGNIN } from '../../common'
import PageHeader from '../../layout/main/PageHeader'
import { postApi } from '../../lib/axios'
import { setLogin } from '../../redux'

const Login = ({ setLogin }) => {
    const history = useHistory()
    const [authState, setAuthState] = useState({
        userId: '',
        password: '',
        remember: false,
    })
    const [isLoading, setIsLoading] = useState(false)
    const submitHandler = (e) => {
        e.preventDefault()
        postApi(setIsLoading, AUTH_SIGNIN, (res) => {
            if(res.data.status){
                setLogin(res.data)
                sessionStorage.setItem('token', res.data.token)
                history.goBack()
            }else{
                alert(res.data.message)
            }
            
        }, authState)
    }
    return (
        <div>
            <PageHeader pageTitle='Login' breadcrumbList={[{ label: 'home', to: '/', isCurrent: false }, { label: 'Login', to: '/about', isCurrent: true }]} />
            <div className='d-flex justify-content-center my-1'>
                <div className="p-1 shadow-2 border-round w-full lg:w-3 md:w-6 sm:w-12">
                    <div className="text-center mb-1">
                        <div className="text-900 text-3xl font-medium mb-1">Ultra Strength Login</div>
                        <span className="text-600 font-medium line-height-2">Don't have an account?</span>
                    </div>
                    <form onSubmit={submitHandler}>
                        <label htmlFor="userId" className="block text-900 font-medium mb-2">Email</label>
                        <InputText id="userId" type="text" className="p-inputtext-sm w-full mb-2" value={authState.userId} onChange={(e) => {
                            setAuthState({ ...authState, userId: e.target.value })
                        }} />
                        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                        <InputText id="password" type="password" className="p-inputtext-sm w-full mb-2" value={authState.password} onChange={(e) => {
                            setAuthState({ ...authState, password: e.target.value })
                        }} />
                         <div className="flex align-items-center justify-content-between my-2">
                            <div className="flex align-items-center">
                                <Checkbox inputId="rememberme1" binary className="mr-2" onChange={e => setAuthState({ ...authState, remember: e.checked })} checked={authState.remember} />
                                <label htmlFor="rememberme1">Remember me</label>
                            </div>
                        </div>
                        <Button type="submit" label="Sign In" icon="pi pi-user" className="p-button-sm w-full" />
                    </form>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setLogin: (data) => dispatch(setLogin(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)