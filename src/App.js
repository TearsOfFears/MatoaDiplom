
import React, {useState,useEffect} from 'react';
import { Home,Cart,Details,Registration,Login,Recovery,Dashboard } from './pages';
import 'animate';
import { Route,Routes,Navigate } from 'react-router';

import {auth,handleUserProfile} from "./firebase/utils"
import MainLayout from './Layouts/MainLayout';
import SecondLayout from './Layouts/SecondLayout';


import {useSelector,useDispatch} from 'react-redux'
import {setCurrentUser} from './redux/User/user.actions';

import WithAuth from './hoc/WithAuth';

const App = (props)=> {

const [state, setstate] = useState(false);
const dispatch= useDispatch();

useEffect(()=>{
 const authListener = auth.onAuthStateChanged(async userAuth =>{
    if(userAuth){
      const userRef = await handleUserProfile(userAuth);
      setstate(true)
      userRef.onSnapshot(snapshot => {
        dispatch(setCurrentUser({
            id:snapshot.id,
            ...snapshot.data(),
        }));
      })

    }
    dispatch(setCurrentUser(userAuth));
    setstate(false)
  });

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
             setCurrentUser && state ? <Navigate to="/" /> :
           ( <SecondLayout >
                  <Login/>
            </SecondLayout>)
          }/>
             <Route  path="/registration" element={
                setCurrentUser && state ? <Navigate to="/" /> :
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



export default App;
