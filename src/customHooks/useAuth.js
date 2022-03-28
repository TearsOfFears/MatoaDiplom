import {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {Navigate, Route, useNavigate, Routes} from 'react-router-dom'
import {Dashboard, Login} from '../pages';
import {checkUserIsSimple} from './../utils/utils'

const mapState = ({user}) => ({currentUser: user.currentUser})

const useAuth = props => {
  let navigate = useNavigate();
  const {currentUser} = useSelector(mapState);
  useEffect(() => {
    if (!checkUserIsSimple(currentUser)) {
        navigate('/login');
    }
  }, [currentUser])
  return currentUser;
}

export default useAuth;