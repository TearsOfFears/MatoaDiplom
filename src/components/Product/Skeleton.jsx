import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  console.log("yes"),
  <ContentLoader 
    speed={2}
    width={300}
    height={480}
    viewBox="0 0 300 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="173" cy="101" r="79" /> 
    <rect x="92" y="207" rx="4" ry="4" width="161" height="24" /> 
    <rect x="99" y="449" rx="0" ry="0" width="1" height="12" /> 
    <rect x="65" y="316" rx="10" ry="10" width="214" height="45" /> 
    <rect x="85" y="270" rx="4" ry="4" width="176" height="24" /> 
    <rect x="96" y="251" rx="4" ry="4" width="152" height="3" /> 
    <rect x="66" y="372" rx="10" ry="10" width="214" height="45" />
  </ContentLoader>
)

export default Skeleton