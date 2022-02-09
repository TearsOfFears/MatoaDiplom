
import React, {useState,useEffect} from 'react';
import { Home,Cart,Details,Registration,Login,Recovery,Dashboard } from './pages';
import 'animate';
import { Route,Routes,Navigate } from 'react-router';

import {auth,handleUserProfile} from "./firebase/utils"
import MainLayout from './Layouts/MainLayout';
import SecondLayout from './Layouts/SecondLayout';


import {connect} from 'react-redux'
import {setCurrentUser} from './redux/User/user.actions';

import WithAuth from './hoc/WithAuth';

const App = (props)=> {

  const {setCurrentUser,currentUser} =props;
useEffect(()=>{

 const authListener = auth.onAuthStateChanged(async userAuth =>{
    if(userAuth){
      const userRef = await handleUserProfile(userAuth);
      userRef.onSnapshot(snapshot => {
        setCurrentUser({
            id:snapshot.id,
            ...snapshot.data(),
          
        })
      });
    }
    setCurrentUser(userAuth);
  });
  console.log("mount");

return()=>{
authListener();
}
},[])




    return (
      <div className='app'>
        <Routes>
          <Route exact path="/" element={
            <MainLayout>
                  <Home/>
            </MainLayout>
          }/>
           <Route exact path="/login" element={ 
             currentUser ? <Navigate to="/" /> :
           ( <SecondLayout >
                  <Login/>
            </SecondLayout>)
          }/>
             <Route  path="/registration" element={
                currentUser ? <Navigate to="/" /> :
            (<SecondLayout >
                  <Registration/>
            </SecondLayout>)
          }/>

           <Route  path="/details" element={
            <SecondLayout>
                  <Details/>
            </SecondLayout>
          }/>
           <Route  path="/cart" element={
            <SecondLayout >
                  <Cart/>
            </SecondLayout>
          }/>
            <Route  path="/recovery" element={
            <SecondLayout>
                  <Recovery/>
            </SecondLayout>
          }/>
           <Route  path="/dashboard" element={
            <SecondLayout>
                  <Dashboard/>
            </SecondLayout>

          }/>
        </Routes>
      </div>
    );

}

const mapStateToProps = ({user})=>({
  currentUser:user.currentUser,
})

const mapDispathToProps = dispatch =>({
  setCurrentUser:user=> dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispathToProps)(App);
