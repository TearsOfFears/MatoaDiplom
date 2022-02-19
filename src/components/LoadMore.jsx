import React from 'react'
import { ButtonForm } from './index'



const LoadMore= ({onLoadMoreEvt = ()=>{}})=> {
  return (
    <ButtonForm onClick={()=>onLoadMoreEvt()}>Завантажити більше </ButtonForm>
  )
}

export default LoadMore