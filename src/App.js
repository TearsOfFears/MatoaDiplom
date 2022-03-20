
import React, {useState,useEffect} from 'react';
import { Home,CartPage,Details,Registration,Login,Recovery,Dashboard,Admin,Products ,ProductsDeatails, Paymant,Order} from './pages';
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
import { fetchHomeContentStart, loadingToggleAction } from './redux/Home/home.actions';
import Loader from './components/Loader/Loader';

const App = (props)=> {

const [state, setstate] = useState(false);
const dispatch = useDispatch();

const mapState = ({user,contentHome})=>({
  currentUser:user.currentUser,
  contentHomeLoading:contentHome.showLoading
})

const {currentUser,contentHomeLoading}= useSelector(mapState);

useEffect(()=>{
dispatch(checkUserSession());
if(!currentUser){
  setstate(true)
}
setstate(true);
},[])

    return (
      <div className='app'>
        <AdminToolBar/>
      {  contentHomeLoading ?  <Loader/> : null}
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
                  <CartPage/>
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
            <Route  exact path="/products" element={
            <SecondLayout>
                  <Products/>
            </SecondLayout>

          }/>
                 <Route  path="/products/:filterType" element={
            <SecondLayout>
                  <Products/>
            </SecondLayout>

          }/>
            <Route  path="/product/:productID" element={
            <SecondLayout>
                  <ProductsDeatails/>
            </SecondLayout>

          }/>
           <Route  path="/payment" element={
              <WithAuth>
              <SecondLayout>
                  <Paymant/>
            </SecondLayout>
              </WithAuth>
          }/>
             <Route  path="/order/:orderID" element={
              <WithAuth>
                  <SecondLayout>
                    <Order/>
                  </SecondLayout>
              </WithAuth>
            }/> 
        </Routes>
      </div>
    );

}



export default App;
