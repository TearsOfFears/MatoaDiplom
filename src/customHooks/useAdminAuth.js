import {useEffect} from 'react';

import { useSelector } from 'react-redux';

import { useNavigate  } from 'react-router-dom';


import {checkUserIsAdmin} from './../utils/utils'

const mapState = ({user})=>({
    currentUser:user.currentUser
})

const useAdminAuth = props =>{
    let navigate = useNavigate();
    const {currentUser} = useSelector(mapState)

    useEffect(()=>{
        if(!checkUserIsAdmin(currentUser)){
            navigate('/login');
            window.scrollTo(0, 0);
        }
    },[currentUser])

    return currentUser;
}

export default useAdminAuth;