
import React, {useState,useEffect} from 'react';
import { Home,Cart,Details,Registration,Login,Recovery,Dashboard,Admin } from './pages';
import 'animate';
import { Route,Routes,Navigate } from 'react-router';

import MainLayout from './Layouts/MainLayout';
import SecondLayout from './Layouts/SecondLayout';
import AdminLayout from './Layouts/AdminLayout';

import { AdminToolBar } from './components';

import {useDispatch,useSelector} from 'react-redux'
import {setCurrentUser,checkUserSession} from './redux/User/user.actions';

import WithAuth from './hoc/WithAuth';

import WithAdminAuth from './hoc/WithAdminAuth';

const App = (props)=> {

const [state, setstate] = useState(false);
const dispatch= useDispatch();

const mapState = ({user})=>({
  currentUser:user.currentUser
})

const {currentUser}= useSelector(mapState);

useEffect(()=>{
dispatch(checkUserSession());

if(currentUser!==null){
  setstate(true)
}
setstate(true);
},[])

    return (
      <div className='app'>
        <AdminToolBar/>
        <Routes>
          <Route exact path="/" element={
            <MainLayout>
                  <Home/>
            </MainLayout>
          }/>
           <Route exact path="/login" element={ 
           currentUser && state ? <Navigate to="/" /> :
           
           ( <SecondLayout >
                  <Login/>
            </SecondLayout>)
          }/>
             <Route  path="/registration" element={
              currentUser && state ? <Navigate to="/" /> :
            (<SecondLayout >
                  <Registration/>
            </SecondLayout>)
          }/>
            <Route  path="/admin" element={
             <WithAdminAuth>
               <AdminLayout >
                  <Admin/>
            </AdminLayout>
             </WithAdminAuth>
       
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
