import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import React, { useEffect, useState } from 'react'
import { AUTH_SIGNUP, REQUEST_CREATE, REQUEST_MY_LIST } from '../../common'
import PageHeader from '../../layout/main/PageHeader'
import { postApi } from '../../lib/axios'
import { connect } from "react-redux"
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { TabView, TabPanel } from 'primereact/tabview';
import { setLogin } from '../../redux'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const ProductCart = ({ auth, product ,setLogin}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [myRequestList, setMyRequestList] = useState([])
  useEffect(() => {
    
    postApi(setIsLoading, REQUEST_MY_LIST, (res) => {
      if(res.data.status){
        setMyRequestList(res.data.data)
      }
     }, {
        defaultId:localStorage.getItem('DEFAULT_ID')
      }
     )
    return () => {
      setMyRequestList([])
    }
  }, [])
  

  const [activeIndex, setActiveIndex] = useState(1);

  const [nonMemeberInputState, setNonMemeberInputState] = useState({
    mobile: auth.mobile === '' ? '' : auth.mobile,
    nickName: '',
  })
 const simpleRegisterInit={
    userId: '',
    password: '',
    nickName: '',
    isTerms:false,
    loginType:'local',
    mobile:'',
  }
  const [simpleRegister, setSimpleRegister] = useState(simpleRegisterInit)
  const [content, setContent] = useState('')

  const contactSubmitHandler = (e) => {
    e.preventDefault()
    if (nonMemeberInputState.mobile.length <= 11) {
      console.log('11글자 이상 숫자로만 입력해주세요.')
    } else if (content.length < 3) {
      console.log('문의하실 내용을 구체적으로 남겨주세요.')
    } else {
      postApi(setIsLoading, REQUEST_CREATE, (res) => {
        if(res.data.status){
          setActiveIndex(1)
          setMyRequestList([...myRequestList,res.data.data])
        }
       }, {
          defaultId:localStorage.getItem('DEFAULT_ID'),
         content:content,...nonMemeberInputState,cartList:product.myCartList})

    }
  }
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const simpleRegisterHandler = (e) => {
    e.preventDefault()
    postApi(setIsLoading, AUTH_SIGNUP, (res) => {
     if(res.data.status){
      setLogin(res.data)
      sessionStorage.setItem('token', res.data.token)
      setSimpleRegister(simpleRegisterInit)

      postApi(setIsLoading, REQUEST_CREATE, (res) => {
        if(res.data.status){
          setActiveIndex(1)
          setMyRequestList([...myRequestList,res.data.data])
        }
       }, {
        defaultId:localStorage.getItem('DEFAULT_ID'),
        content: content,cartList:product.myCartList})
     }
    }, simpleRegister)
  }
  return (
    <div>
      <PageHeader pageTitle='My Cart' breadcrumbList={[{ label: 'home', to: '/', isCurrent: false }, { label: 'cart', to: '/product/cart', isCurrent: true }]} />


      <div className='container my-lg-5'>
        <div className='row'>
          {product.myCartList.map((item, i) => {
            return (
              <div key={i} className="col-lg-6 col-sm-12">
                <div className='row'>
                  <div className='col-6'>
                    <Image src={`${process.env.REACT_APP_DOMAIN}${item.images[0].src}`} alt={item.images[0].label} imageStyle={{ width: "100%", objectFit: 'cover', objectPosition: 'center' }} />
                  </div>
                  <div className='col-6'>
                    <h4>{i + 1}. {item.label}</h4>
                    <p>{item.myOptions.length} 개의 옵션 선택</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>





      <div className='container my-lg-5'>

        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="문의하기">
            {auth.isLogin ?
              <input id="contactMobileEail" defaultValue={auth.mobile} className="form-control w-100 mb-2 py-3 ps-4 pe-5" type="text" placeholder="ex)010-1234-1234"
                onChange={(e) => {
                  e.preventDefault()

                  setNonMemeberInputState({ ...nonMemeberInputState, contact: e.target.value })
                }} />
              :
              <div>
                <label htmlFor="#contactNickName">Name</label>
                <input id="contactNickName" value={nonMemeberInputState.nickName} className="form-control  w-100 mb-2  py-3 ps-4 pe-5" type="text" placeholder="Your Name"
                  onChange={(e) => {
                    e.preventDefault()
                    setSimpleRegister({ ...simpleRegister, nickName: e.target.value })
                    setNonMemeberInputState({ ...nonMemeberInputState, nickName: e.target.value })


                  }} />
                <label htmlFor='#contactMobile'>Mobile</label>
                <input autoComplete='off' id="contactMobile" value={nonMemeberInputState.mobile} className="form-control w-100 mb-2 py-3 ps-4 pe-5" type="text" placeholder="ex)01012341234"
                  onChange={(e) => {
                    e.preventDefault()
                    const reg = new RegExp(/[a-zA-Zㄱ-ㅎ가-힣|\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi)
                    const value = e.target.value.replaceAll(reg, '')
                    setSimpleRegister({ ...simpleRegister, mobile:value })
                    setNonMemeberInputState({ ...nonMemeberInputState, mobile: value })
                  }} />
              </div>
            }
            <textarea value={content} className='form-control w-100  mb-2 py-3 ps-4 pe-5' rows={8} placeholder="문의하실 내용..."
              onChange={(e) => {
                e.preventDefault()
                setContent(e.target.value)
              }}
            ></textarea>

            <div>
              정보 수집및 이용안내
            </div>

            <div className='d-flex justify-content-end'>
              <button type="button" className="btn btn-success py-2 mt-2 mr-2" onClick={contactSubmitHandler}>문의하기</button>
              {auth.isLogin === false ?
                <button
                disabled={nonMemeberInputState.nickName.length<2 ||content.length<2 || nonMemeberInputState.mobile.length<11?true:false }
                type="button" className="btn btn-primary py-2 mt-2" onClick={(e) => {
                  e.preventDefault()
                  setIsRegisterOpen(true)
                }}>위 정보로 회원가입 후 문의하기</button> : null}
            </div>
          </TabPanel>
          <TabPanel header="문의목록">
              <DataTable value={myRequestList} responsiveLayout="scroll" loading={isLoading}>
           
                    <Column field="content" header="content" ></Column>
                    <Column field="adminComment" header="결과" ></Column>
                </DataTable>
          </TabPanel>
        </TabView>



      </div>


      <Dialog visible={isRegisterOpen} header="Simple Register" onHide={() => { setIsRegisterOpen(false) }} >
        <form onSubmit={simpleRegisterHandler}>
          <label htmlFor="#register-email">Email</label>
          <input id="register-email" value={simpleRegister.userId} className="form-control  w-100 mb-2  py-3 ps-4 pe-5" type="text" placeholder="Your email"
            onChange={(e) => {
              e.preventDefault()
              setSimpleRegister({ ...simpleRegister, userId: e.target.value })
            }} />

          <label htmlFor="#register-password">Password</label>
          <input id="register-password" value={simpleRegister.password} className="form-control  w-100 mb-2  py-3 ps-4 pe-5" type="password" placeholder="password"
            onChange={(e) => {
              e.preventDefault()
              setSimpleRegister({ ...simpleRegister, password: e.target.value })
            }} />
          <label htmlFor="#register-nickName">nickName</label>
          <input id="register-nickName" value={nonMemeberInputState.nickName} className="form-control  w-100 mb-2  py-3 ps-4 pe-5" type="text" placeholder="nickName"
            onChange={(e) => {
              e.preventDefault()
              setSimpleRegister({ ...simpleRegister, nickName: e.target.value })
              setNonMemeberInputState({ ...nonMemeberInputState, nickName: e.target.value })
            }} />
          <div className='d-flex justify-content-end'>
            <button type="submit" className="btn btn-primary py-2 mt-2 mr-2">회원가입</button>
          </div>


        </form>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    product: state.product
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setLogin:(data)=>dispatch(setLogin(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCart)