
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
import WithLoader from "./hoc/WithLoader"
import WithAdminAuth from './hoc/WithAdminAuth';
import WithProductLoader from './hoc/WithProductLoader';
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
  contentProductLoading:productsData.showLoading,
  contentLoadingCurrentProduct:productsData.showLoadingCurrentProduct
})

const {currentUser}= useSelector(mapState);

useEffect(()=>{
dispatch(checkUserSession());
dispatch(fetchHomeContentStart())
dispatch(fetchProductsStart())
if(!currentUser){
  setstate(true)
}
setstate(true);
},[])

    return (
      <div className='app'>
        <AdminToolBar/>
        <Routes>
          <Route exact path="/" element={
              <WithLoader>
              <MainLayout>
                  <Home/>
            </MainLayout>
              </WithLoader>
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
             <WithProductLoader>
             <WithAuth>
              <SecondLayout >
                  <CartPage/>
            </SecondLayout>
             </WithAuth>
             </WithProductLoader>
          }/>
            <Route  path="/recovery" element={
            <SecondLayout>
                  <Recovery/>
            </SecondLayout>
          }/>
           <Route  path="/dashboard" element={
                <WithProductLoader>
             <WithAuth>
              <SecondLayout>
                  <Dashboard/>
            </SecondLayout>
             </WithAuth>
             </WithProductLoader>

          }/>
            <Route  exact path="/products" element={
              <WithProductLoader>
 <SecondLayout>
                  <Products/>
            </SecondLayout>
              </WithProductLoader>
                   

          }/>
            <Route  path="/product/:productName" element={
              <WithProductLoader>
       <SecondLayout>
              <ProductsDeatails/>
        </SecondLayout>
              </WithProductLoader>
      

          }/>
           <Route  path="/payment" element={
              <WithAuth> 
              <SecondLayout>
                  <Paymant/>
            </SecondLayout>
            </WithAuth>
          }/>
             <Route  path="/order/:orderID" element={
               <WithProductLoader>
    <WithAuth>
                  <SecondLayout>
                    <Order/>
                  </SecondLayout>
              </WithAuth>
               </WithProductLoader>
          
            }/> 
             <Route  path="/news" element={
                 <WithLoader>
                     <WithProductLoader>
              <NewsLayout>
                  <News/>
            </NewsLayout>
            </WithProductLoader>
            </WithLoader>
             }/> 
              <Route  path="/aboutUs" element={
                <WithLoader>
         <SecondLayout>
                    <AboutUS/>
              </SecondLayout>
                </WithLoader>
           
             }/> 
             <Route  path="/forBusiness" element={
             <WithLoader>
              <SecondLayout>
                <Business/>
          </SecondLayout>
          </WithLoader>
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
