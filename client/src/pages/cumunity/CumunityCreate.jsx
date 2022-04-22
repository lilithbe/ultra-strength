import React, { useEffect, useState ,useRef} from 'react'
import { connect } from "react-redux"
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import PageHeader from '../../layout/main/PageHeader'
import { useParams ,useHistory} from 'react-router-dom'
import { postApi } from '../../lib/axios';
import { POST_CREATE } from '../../common';
import { confirmDialog } from 'primereact/confirmdialog';
const CumunityCreate = ({auth}) => {
  const editor = useRef(null)
  const { category } = useParams()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [postState, setPostState] = useState({
    thumbnail: '',
    subject: '',
    content: '',
    category: category,
  })
  const submitHandler = (e) => { 
    e.preventDefault()
    if(!auth.isLogin){     
      alert('로그인후 사용하셈')
    }else if(postState.subject.length<1){
      alert('제목이 짧음')
    }else if(postState.content.length<1){
      alert('컨텐츠가 짧음')
    }else{
      postApi(setIsLoading,POST_CREATE,(res)=>{
        console.log(res)
        confirmDialog({
          message: 'Are you sure you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel:'게시글 보기',
          rejectLabel:'목록보기',
          accept: () => {history.push(`/cumunity/view/${category}/${res.data.data._id}`)},
          reject: () => {history.push(`/cumunity/list/${category}`)}
      });
      },postState)
    }
   
   }
  return (
    <div>

      <PageHeader pageTitle='CumunityCreate' breadcrumbList={[{ label: 'home', to: '/', isCurrent: false }, { label: 'about', to: '/about', isCurrent: true }]} />
      <div className='container'>
        {auth.isLogin?
       <form onSubmit={submitHandler}>
       <input className='form-control mb-2'
        value={postState.subject} 
        placeholder="제목을 입력하세요..."
        onChange={(e)=>{
          e.preventDefault()
          setPostState({...postState,subject:e.target.value})
        }}/>
        <div className="mb-2">
          <SunEditor
          getSunEditorInstance={(se)=>editor.current=se}
          // ref={editor}
            defaultValue={postState.content}
            setOptions={{
              minHeight: "330",
              height: "auto",
              max: "700",
              buttonList: [
                ["undo", "redo",],
                ["font", "fontSize", "formatBlock",],
                ["paragraphStyle", "blockquote", "bold", "underline", "italic", "strike", "subscript", "superscript", "fontColor", "hiliteColor", "textStyle", "removeFormat",],
                ["outdent", "indent",],
                ["align",],
                ["horizontalRule", "list", "lineHeight", "table", "showBlocks",],
                // ["link", "image", "video", "audio",],
                ["codeView", "preview", "fullScreen",]
              ],
              // imageUploadHeader :{
              //   Authorization:sessionStorage.getItem('token')
              // },
              // imageUploadUrl:PRODUCT_INFO_IMAGE_UPLOAD,

            }}
           
            onChange={(contents) => {
              console.log(editor.current.getText())
              setPostState((prev)=>{
              return  { ...prev, content: contents,text:editor.current.getText() }
              })
            }}
            onImageUpload={(targetElement, index, state, info, remainingFilesCount, core) => {
              // console.log(targetElement, index, state, info, remainingFilesCount, core)
            }}
          />
        </div>

        <button type='submit' className='btn btn-outline-primary w-100' >Submit</button>
       </form>:
       <div>
         login go
       </div>
}
      </div>

    </div>
  )
}
const mapStateToProps = (state) => {
  return {
      auth:state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CumunityCreate)