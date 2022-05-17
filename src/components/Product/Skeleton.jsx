import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={300}
    height={420}
    viewBox="0 0 300 420"
    backgroundColor="#e5e1e1"
    foregroundColor="#dfd8d8"
    {...props}
  >
    <circle cx="542" cy="127" r="79" /> 
    <rect x="45" y="239" rx="4" ry="4" width="222" height="24" /> 
    <rect x="314" y="363" rx="10" ry="10" width="214" height="45" /> 
    <rect x="315" y="309" rx="4" ry="4" width="176" height="24" /> 
    <rect x="76" y="277" rx="4" ry="4" width="160" height="3" /> 
    <rect x="87" y="304" rx="10" ry="10" width="138" height="23" /> 
    <rect x="203" y="99" rx="0" ry="0" width="16" height="1" /> 
    <rect x="61" y="32" rx="100" ry="100" width="190" height="187" /> 
    <rect x="171" y="158" rx="0" ry="0" width="9" height="0" />
  </ContentLoader>
)

export default Skeleton