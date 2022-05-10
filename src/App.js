
import React, {useState,useEffect} from 'react';
import { Home,CartPage,Details,Registration,Login,Recovery,Dashboard,Admin,Products ,ProductsDeatails, Paymant,Order, News, NewsRenderDetails} from './pages';
import 'animate';
import { Route,Routes,Navigate } from 'react-router';

import MainLayout from './Layouts/MainLayout';
import SecondLayout from './Layouts/SecondLayout';
import AdminLayout from './Layouts/AdminLayout';

import { AdminToolBar } from './components';

import {useDispatch,useSelector} from 'react-redux'
import {checkUserSession} from './redux/User/user.actions';

import WithAuth from './hoc/WithAuth';

import WithAdminAuth from './hoc/WithAdminAuth';
import Loader from './components/Loader/Loader';
import { fetchHomeContentStart } from './redux/Home/home.actions';
import { fetchProductsStart } from './redux/Products/products.actions';
import NewsLayout from './Layouts/NewsLayout';
import AboutUS from './pages/AboutUS';
import Business from './pages/Business';

const App = (props)=> {

const [state, setstate] = useState(false);
const [hide, setIsHide] = useState(true);
const dispatch = useDispatch();

const mapState = ({user,contentHome,productsData})=>({
  currentUser:user.currentUser,
  userLoading:user.loading,
  contentHomeLoading:contentHome.showLoading,
  contentProductLoading:productsData.showLoading
})

const {currentUser,userLoading,contentHomeLoading,contentProductLoading}= useSelector(mapState);

useEffect(()=>{
dispatch(checkUserSession());
dispatch(fetchHomeContentStart())
dispatch(fetchProductsStart())
if(!currentUser){
  setstate(true)
}
setstate(true);
},[])

if(!contentHomeLoading && !userLoading){
  setTimeout(() => setIsHide(false), 1000);
}
    return (
      <div className='app'>
        <AdminToolBar/>
        <Routes>
          <Route exact path="/" element={
              hide  ?  <Loader/> :
          (  <MainLayout>
                  <Home/>
            </MainLayout>)
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
                 //<WithAuth>
            <SecondLayout >
                  <CartPage/>
            </SecondLayout>
            //</WithAuth>
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
                 contentProductLoading  ?  <Loader/> : (    <SecondLayout>
                  <Products/>
            </SecondLayout>)

          }/>
                 <Route  path="/products" element={
            <SecondLayout>
                  <Products/>
            </SecondLayout>
          }/>
            <Route  path="/product/:productName" element={
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
             <Route  path="/news" element={
              <NewsLayout>
                  <News/>
            </NewsLayout>
             }/> 
              <Route  path="/aboutUs" element={
                   hide  ?  <Loader/> :
                   (   <SecondLayout>
                    <AboutUS/>
              </SecondLayout>)
             }/> 
             <Route  path="/forBusiness" element={
              hide  ?  <Loader/> :
              (     <SecondLayout>
                <Business/>
          </SecondLayout>)
             }/> 
             <Route  path="/news/:newsLink" element={
             <NewsLayout>
                  <NewsRenderDetails/>
            </NewsLayout>
          }/>
        </Routes>
      </div>
    );

}



export default App;
