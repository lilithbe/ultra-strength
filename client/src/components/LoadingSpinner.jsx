import React from 'react'
import styled from 'styled-components'
import { ProgressSpinner } from 'primereact/progressspinner';
const Spinner=styled.div`
    z-index:99999999;
`
const LoadingSpinner = ({loading}) => { 
  return (
      <Spinner className={`${loading?'':'d-none'} bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center`}>
          <ProgressSpinner/>
      </Spinner>
  )
}

export default LoadingSpinner