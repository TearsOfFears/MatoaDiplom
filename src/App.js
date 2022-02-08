
import React, {Component} from 'react';
import { Home,Cart,Details,Registration,Login,Recovery } from './pages';
import 'animate';
import { Route,Routes,Navigate } from 'react-router';

import {auth,handleUserProfile} from "./firebase/utils"
import MainLayout from './Layouts/MainLayout';
import SecondLayout from './Layouts/SecondLayout';


import {connect} from 'react-redux'
import {setCurrentUser} from './redux/User/user.actions';


class App extends Component {

  authListener = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.authListener = auth.onAuthStateChanged(async userAuth =>{
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
  }

  componentWillUnmount(){
      this.authListener();
  }
  

  render(){

    const { currentUser } = this.props;

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
             <Route exact path="/registration" element={
                currentUser ? <Navigate to="/" /> :
            (<SecondLayout >
                  <Registration/>
            </SecondLayout>)
          }/>

           <Route exact path="/details" element={
            <SecondLayout>
                  <Details/>
            </SecondLayout>
          }/>
           <Route exact path="/cart" element={
            <SecondLayout >
                  <Cart/>
            </SecondLayout>
          }/>
            <Route exact path="/recovery" element={
            <SecondLayout>
                  <Recovery/>
            </SecondLayout>
          }/>
        </Routes>
      </div>
    );
  }

}

const mapStateToProps = ({user})=>({
  currentUser:user.currentUser,
})

const mapDispathToProps = dispatch =>({
  setCurrentUser:user=> dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispathToProps)(App);
