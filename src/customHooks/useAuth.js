import {useEffect,useState} from 'react'
import { useSelector } from "react-redux";
import {Navigate,Route,useNavigate,Routes } from 'react-router-dom'
import { Dashboard, Login } from '../pages';


const mapState = ({user})=>({
    currentUser:user.currentUser
})

const useAuth= props =>{
    const {currentUser}= useSelector(mapState);
    useEffect(()=>{
if(!currentUser){
return (

          <Route exact path="/login" element={<Login/>}/>

)
}
    },[currentUser])
    return currentUser;
}

export default useAuth;