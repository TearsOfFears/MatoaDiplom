import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonOrders = (props) => (
    <ContentLoader 
    speed={2}
    width={800}
    height={100}
    viewBox="0 0 800 100"
    backgroundColor="red"
    foregroundColor="red"
    {...props}
  >
    <rect x="155" y="10" rx="10" ry="10" width="98" height="12" /> 
    <rect x="321" y="10" rx="10" ry="10" width="68" height="10" /> 
    <rect x="465" y="11" rx="10" ry="10" width="42" height="13" /> 
    <rect x="10" y="10" rx="10" ry="10" width="68" height="11" />
  </ContentLoader>
)

export default SkeletonOrders