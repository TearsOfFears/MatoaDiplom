import React from 'react'
import { ButtonForm } from './../index'



const LoadMore= ({onLoadMoreEvt = ()=>{},style } )=> {
  return (
    <ButtonForm style={style} onClick={()=>onLoadMoreEvt()}>Завантажити більше </ButtonForm>
  )
}

export default LoadMore