
import React, {Component} from 'react';
import { Home,Cart,Details,Registration,Login } from './pages';
import 'animate';
import { Route,Routes,Navigate } from 'react-router';

import {auth,handleUserProfile} from "./firebase/utils"
import MainLayout from './Layouts/MainLayout';
import SecondLayout from './Layouts/SecondLayout';

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
           ( <SecondLayout currentUser={currentUser} >
                  <Login/>
            </SecondLayout>)
          }/>
             <Route exact path="/registration" element={
                currentUser ? <Navigate to="/" /> :
            (<SecondLayout currentUser={currentUser} >
                  <Registration/>
            </SecondLayout>)
          }/>

           <Route exact path="/details" element={
            <SecondLayout currentUser={currentUser} >
                  <Details/>
            </SecondLayout>
          }/>
           <Route exact path="/cart" element={
            <SecondLayout currentUser={currentUser} >
                  <Cart/>
            </SecondLayout>
          }/>

        </Routes>
      </div>
    );
  }

}

export default App;
