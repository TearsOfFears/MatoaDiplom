
import React from 'react';
import { Home,Cart,Details } from './pages';
import 'animate';
import { Route,Routes } from 'react-router';


function App() {
  return (
    <div>
      <Routes>
    
        <Route path={"/"}  element={<Home />}  />
        <Route path={"/details"}  element={<Details />}  />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
