
import React from 'react';
import { Home,Cart } from './pages';
import 'animate';
import { Route,Routes } from 'react-router';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
