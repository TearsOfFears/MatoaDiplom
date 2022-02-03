
import React from 'react';
import { Home,Cart,Details,Registration,Login } from './pages';
import 'animate';
import { Route,Routes } from 'react-router';


function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/"  element={<Home />}  />
        <Route path="/details"  element={<Details />}  />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
