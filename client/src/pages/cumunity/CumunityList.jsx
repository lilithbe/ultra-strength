import React, { useEffect, useState } from 'react'
import PageHeader from '../../layout/main/PageHeader'
import { Link, useParams } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { postApi } from '../../lib/axios'
import { POST_GET_LIST_CATEGORY } from '../../common'
import { Column } from 'primereact/column'
import { Card } from 'primereact/card'
import { howMushTime } from '../../lib/moment'

const CumunityList = () => {
  const { category } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [postList, setPostList] = useState([])
  const [valuePostList, setValuePostList] = useState([])
  useEffect(() => {
    postApi(setIsLoading, POST_GET_LIST_CATEGORY, (res) => {
      setPostList(res.data.list) //search origin data
      setValuePostList(res.data.list)
    }, { category: category })

    return () => {

    }
  }, [category])
  const cardHeader = () => {
    return (
      <div className='p-1'>
        <Link className='btn btn-sm btn-outline-primary' to={`/cumunity/create/${category}`}>글쓰기</Link>
      </div>
    )
  }
  return (
    <div>
      <PageHeader pageTitle={category} breadcrumbList={[
        { label: 'home', to: '/', isCurrent: false },
        { label: `${category}`, to: '/', isCurrent: true }
      ]} />
      <div className='container'>
        <Card header={cardHeader}>
          <DataTable value={valuePostList} loading={isLoading} size="small" emptyMessage="게시글이 없습니다.">
            <Column field='subject' header="제목" body={(row) => {
              return <Link className='text-white fs-6' to={`/cumunity/view/${category}/${row._id}`}>{row.subject}</Link>
            }} />
            <Column field="nickName" header="작성자"/>
            <Column field='updatedAt' header="날짜" body={(row) => {
              return howMushTime(row.updatedAt)
            }} />
          </DataTable>
        </Card>
      </div>


    </div>
  )
}

export default CumunityList