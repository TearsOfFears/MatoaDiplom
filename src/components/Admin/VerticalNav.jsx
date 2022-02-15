import React from 'react'
import {useSelector} from  'react-redux'
import UserProfile from './UserProfile'
const mapState = ({user})=>({
    currentUser:user.currentUser
})

const VerticalNav= (props)=> {
    const {currentUser} = useSelector(mapState)
    const configUserProfile = {
        currentUser
    }
    console.log(configUserProfile)
  return (
    <div className='verticalNav'>
        <UserProfile {...configUserProfile}/>
        <div className="menu">
            {props.children}
        </div>
    </div>
  )
}

export default VerticalNav