import React from 'react'
import { useParams } from 'react-router';
function NewsRenderDetails() {
  const {newsLink} = useParams();
  return (
    <div>{newsLink}</div>
  )
}

export default NewsRenderDetails