
import React, {Component} from 'react';
import { Home,Cart,Details,Registration,Login } from './pages';
import 'animate';
import { Route,Routes,Navigate } from 'react-router';

import {auth,handleUserProfile} from "./firebase/utils"
import MainLayout from './Layouts/MainLayout';

const initializeState = {
  currentUser:null
};

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      ...initializeState
    };
  }
  authListener = null;


  componentDidMount(){
    this.authListener = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data(),
            }
          })
        });
      }
      this.setState({
        ...initializeState
      })
    });
    console.log("mount");
  }

  componentWillUnmount(){
      this.authListener();
  }
  

  render(){

    const { currentUser } = this.state;

    return (
      <div className='app'>
        <Routes>
          <Route exact path="/" element={
            <MainLayout currentUser={currentUser} >
                  <Home/>
            </MainLayout>
          }/>
           <Route exact path="/login" element={ 
             currentUser ? <Navigate to="/" /> :
           ( <MainLayout currentUser={currentUser} >
                  <Login/>
            </MainLayout>)
          }/>
             <Route exact path="/registration" element={
            <MainLayout currentUser={currentUser} >
                  <Registration/>
            </MainLayout>
          }/>

           <Route exact path="/details" element={
            <MainLayout currentUser={currentUser} >
                  <Details/>
            </MainLayout>
          }/>
           <Route exact path="/cart" element={
            <MainLayout currentUser={currentUser} >
                  <Cart/>
            </MainLayout>
          }/>

        </Routes>
      </div>
    );
  }

}

export default App;
