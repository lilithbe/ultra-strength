import React, { useState } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { postApi } from '../../../lib/axios'
import { POST_CATEGORY_CREATE,POST_CATEGORY_DELETE, POST_CATEGORY_UPDATE } from '../../../common/path'
import { connect } from "react-redux"
import { setCategory } from '../../../redux'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Checkbox } from 'primereact/checkbox';
const CategoryList = ({auth,category,setCategory}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false)
  const newCategoryInit ={
    label:'',
    value:''
  }
  const [newCategory, setNewCategory] = useState(newCategoryInit)
  const newCategorySubmit = (e) => { 
    if(category.findIndex(f =>f.label===newCategory.label)!==-1 ){
      alert('중복된 label')
    }else if( category.findIndex(f =>f.value===newCategory.value)!==-1){
      alert('중복된 value')
    }else{
      postApi(setIsLoading , POST_CATEGORY_CREATE ,(res)=>{
        setNewCategory(newCategoryInit)
        setIsNewCategoryOpen(false)
        setCategory({category:[...category,res.data]})
      },newCategory)
    }

   }
   const deleteHandler = (index,id,value) => { 
     postApi(setIsLoading , POST_CATEGORY_DELETE,(res)=>{
       const result= Array.from(category)
       result.splice(index,1)
        setCategory({category:result})
     },{_id:id,value:value})
    }
    const onRowEditComplete = (e) => { 
      let _category = [...category];
      let { newData, index } = e;
      _category[index] = newData;
      postApi(setIsLoading , POST_CATEGORY_UPDATE ,(res)=>{

        setCategory({category:_category});
      },_category[index])
     }
     const fieldChangeHandler = (field,index,value,callback) => { 
      const checkIndex = category.findIndex(f=>f[field]===value)
        if(checkIndex===index){
          callback(value) //동일한 입력
        }else if(checkIndex===-1){
    

          callback(value)
        }else{
          alert(`중복된 카테고리 ${field}입니다.`)
        }
      }
     const textEditor = (options) => {
       
      return <InputText type="text" value={options.value} onChange={(e) =>fieldChangeHandler(options.field,options.rowIndex ,e.target.value,options.editorCallback)} />;
  }

  const checkEditor = (options) => {
       
    return <Checkbox checked={options.value} onChange={(e) =>fieldChangeHandler(options.field,options.rowIndex ,e.checked,options.editorCallback)} />;
}
  return (
    <div>
        <h1 className='text-900 font-bold text-6xl'><i className='bi bi-list-check'/>Post Category List</h1>
        <Button label="Add to Category" onClick={()=>setIsNewCategoryOpen(true)}/>

        <DataTable value={category}  editMode="row" dataKey="_id" onRowEditComplete={onRowEditComplete} responsiveLayout="scroll">
          <Column field='label'  editor={(options) => textEditor(options)} style={{ width: '20%' }} header="Label"/>
          <Column field='value'  editor={(options) => textEditor(options)} style={{ width: '20%' }} header="Value"/>
          <Column field='isUsed' body={(row,col)=>{
            return row.isUser?'Y':'N'
          }}  editor={(options) => checkEditor(options)} style={{ width: '20%' }} header="isUsed"/>
          <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} header="edit" bodyStyle={{ textAlign: 'center' }}></Column>
          <Column body={(row,col)=>{
            return(
              <Button icon="bi bi-x" onClick={()=>{deleteHandler(col.rowIndex,row._id,row.value)}}/>
            )
          }} header="Delete"/>
        </DataTable>
        <Dialog header="New Category Create" visible={isNewCategoryOpen} onHide={()=>setIsNewCategoryOpen(false)}>
          <InputText placeholder='한글 or 영문'className='w-100 p-inputtext-sm' value={newCategory.label} onChange={(e)=>setNewCategory({...newCategory , label:e.target.value})}/>
          <InputText placeholder='영문' className='w-100 p-inputtext-sm' value={newCategory.value} onChange={(e)=>setNewCategory({...newCategory , value:e.target.value})}/>
          <Button label="Submit" onClick={newCategorySubmit}/>
          
        </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth:state.auth,
    category:state.category.category
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCategory:(data)=>dispatch(setCategory(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
