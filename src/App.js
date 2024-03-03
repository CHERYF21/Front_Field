import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import HelpSupport from './components/HelpSupport';
import Default from './components/Default';
import Productos from './components/Productos.jsx';
import { Route, Routes } from 'react-router-dom';
import ListProduct from './components/ListProducts.jsx';
import Inicio from './components/Inicio.jsx';
import Admin from './components/Admin.jsx';

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
  
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/helpsupport" element={<HelpSupport />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/listproducts" element={<ListProduct />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="*" element={<Default />} />

      </Routes>
    </div>
  );
}

export default App;
