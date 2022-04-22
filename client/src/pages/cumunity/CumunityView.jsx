import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { Link, useParams } from 'react-router-dom'
import { postApi } from '../../lib/axios'
import { POST_GET_ONE ,POST_COMMENT_CREATE,POST_COMMENT_UPDATE,POST_COMMENT_DELETE,POST_COMMENT_LIST, AUTH_GET_USER_INFO} from '../../common'
import PageHeader from '../../layout/main/PageHeader'
import htmlparser from 'html-react-parser'
import { howMushTime } from '../../lib/moment'
import { SplitButton } from 'primereact/splitbutton';
const CumunityView = ({auth}) => {
  const { category,id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [post, setPost] = useState({
    subject:'',
    content:'',
    nickName:'',
    good:0,
    hit:0,
    updatedAt:'',
    tag:[],
  })
  useEffect(() => {
    postApi(setIsLoading, POST_GET_ONE, (res) => {
      setPost(res.data)
      console.log(res.data)
      // setPost(res.data.data) //search origin data
    }, {_id:id })

    return () => {

    }
  }, [category])

  const [commentList, setCommentList] = useState([])
  useEffect(() => {
    postApi(setIsLoading, POST_COMMENT_LIST, (res) => {
      setCommentList(res.data)
    }, {targetId:id,targetType:'post' })
    return () => {
      setCommentList([])
    }
  }, [category])
const newCommentHandler = (data) => { 
  setCommentList([...commentList, data])
 }
 const commentDeleteHandler = () => { 
   
  }
  return (
    <div>
          <PageHeader pageTitle={category} breadcrumbList={[
        { label: 'home', to: '/', isCurrent: false },
        { label: `${category}`, to: '/', isCurrent: true }
      ]} />

      <div className='container post-wrapper'>
        <h3 className='post-subject'>{post.subject}</h3>
        <div className='d-flex justify-content-between'>
          <div>
            <span><i className='bi bi-heart' /> {post.good} </span>
            <span><i className='bi bi-bookmark' /> {post.hit} </span>
          </div>
          <div>
            {howMushTime(post.updatedAt)}
          </div>
        </div>
        <div >
          {post.nickName}
        </div>
        <hr />
        <div className='post-content'>
          {htmlparser(post.content)}
        </div>
        <hr />
        {post.tag.length>0?
        <div>
         <h5>Tags</h5>
         {post.tag.map((tag,i)=>{
           return <span key={i} className="post-tag"># {tag}</span>
         })}
       </div>:null}


        <div className='post-comment-wrapper my-sm-1 my-lg-5'>
          <h5>Comment</h5>
          <CommentWrite parrentId={id} targetId={id} targetType={"post"} auth={auth} addComment={newCommentHandler}/>         
          <div className='comment-list'>
            <CommentList postId={id}  items={commentList} auth={auth} commentDelete={commentDeleteHandler}/>
          </div>
        </div>
      
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

export default connect(mapStateToProps, mapDispatchToProps)(CumunityView)

const CommentWrite = ({parrentId,targetId,targetType,auth , addComment}) => { 
  const [isLoading, setIsLoading] = useState(false)
  const newCommentInit ={
    content:'',
    targetType:targetType,
    parrentId:parrentId,
    targetId:targetId,
  }
  const [newCommentState, setNewCommentState] = useState(newCommentInit)
  const commentChangeHandler = (e) => { 
    let value=e.target.value
    setNewCommentState({...newCommentState,content:value})
   }
  const commentHandler = (e) => {
    if(newCommentState.content.length<1){
      alert('내용을 입력하세요.')
    }else{
      postApi(setIsLoading, POST_COMMENT_CREATE, (res) => {
        addComment(res.data)
        setNewCommentState(newCommentInit)
      },newCommentState)
    }
   }
  return(
    <div>
      {auth.isLogin?
        <div className='input-group new-comment'>
        <textarea rows={3} className="form-control comment-textarea" value={newCommentState.content} onChange={commentChangeHandler}></textarea>
        <button className='btn btn-outline-primary' onClick={commentHandler}>Send</button>
      </div>:
      null}
    </div>
  
  )
 }

 const CommentList = ({items ,auth, commentDelete ,postId, parrent}) => { 
   return(
     <div>
       {items.map((comment,i)=>{
        return (
          <CommentItem key={i} comment={comment} auth={auth} index={i} commentDelete={commentDelete} postId={postId} parrent={parrent}/>
        )
       })}
     </div>
   )
  }

  const CommentItem = ({comment ,auth ,index, postId ,commentDelete,parrent }) => { 
    const [isLoading, setIsLoading] = useState(false)
    
    const [commentUser, setCommentUser] = useState({
      _id:'',
      nickName:'',
      userImage:'imoge',
    })
    const [targetData, setTargetData] = useState({
      _id:'',
      nickName:'',
      userImage:'imoge',
    })
    const [isRecommentOpen, setIsRecommentOpen] = useState(false)
    const [reCommentList, setReCommentList] = useState([])
  useEffect(() => {
    postApi(setIsLoading, POST_COMMENT_LIST, (res) => {
      setReCommentList(res.data)    
    }, {targetId:comment._id,targetType:'user' })  
    return () => {  
      setReCommentList([])    
    }
  }, [comment])
    useEffect(() => {
      postApi(setIsLoading, AUTH_GET_USER_INFO, (res) => {
        setCommentUser(res.data.data)
      }, {userId:comment.userId })
      if(comment.targetType==='user'){
        postApi(setIsLoading, AUTH_GET_USER_INFO, (res) => {
          console.log(res)
          // setTargetData(res.data.data)
        }, {userId:comment.targetId })
      }
      return () => {
        setCommentUser([])
      }
    }, [comment]) 





    const items = [
      {
          label: 'Add Comment',
          icon: 'pi pi-pencil',
          command: () => {
            setIsRecommentOpen(true)
          }
      },
      {
        label: 'Open Profile',
        icon: 'pi pi-pencil',
        command: () => {
          
        }
    },
  ];
  const myContentItem=[
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: () => {
        
      }
  },    {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      commentDelete()
    }
},  {
  label: 'Re Comment Write(test)',
  icon: 'pi pi-pencil',
  command: () => {
    setIsRecommentOpen(true)
  }
},
  ]

    return(

      
   <div className='comment-item  my-sm-2 my-lg-5'>

        <div className='row'>
          <div className='col-sm-12 col-lg-2'>
          <div className='comment-nickname'>{commentUser.nickName}</div>
          <div> {howMushTime(comment.updatedAt)}</div>
            <SplitButton icon="bi bi-heart" label={comment.good} model={auth.userId === comment.userId ? myContentItem : items}
              buttonClassName="p-button-outlined p-button-sm p-1"
              menuButtonClassName='p-button-outlined p-button-sm p-1'
              className=" p-button-help"
              onClick={(e) => { console.log('하뚜하뚜') }}
            ></SplitButton>
          </div>
          <div className='col-sm-12 col-lg-10'>
          <div className='comment-content mt-sm-2'>
          {comment.targetType==='user'?<p>To.<span className='fw-bold text-warning'>{parrent.nickName}</span></p>:''}
            {comment.content}</div>
          </div>
        </div>
        {isRecommentOpen?
        <CommentWrite 
        auth={auth} 
        parrentId={postId} 
        targetId={comment._id} 
        targetType={"user"} 
        addComment={(e)=>{
          console.log(e)
        }}
        />:null}
        <div>
        <CommentList postId={postId}  items={reCommentList} auth={auth} commentDelete={()=>{}} parrent={commentUser}/>
        </div>
   </div>
    )
   }