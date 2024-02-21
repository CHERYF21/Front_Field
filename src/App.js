import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';
import Contact from './components/Contact';
import HelpSupport from './components/HelpSupport';
import Default from './components/Default';
import Login from './components/Login'; 
import Inicio from './components/Inicio.jsx';
import Productos from './components/Productos.jsx';



function App() {
  return (
    <div>
          <Navbar/>
      <Routes>
        <Route path="/" element={<Inicio />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/helpsupport" element={<HelpSupport />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/productos" element={<Productos />} />
          {/* Ruta por defecto */}
          <Route path="*" element={<Default />} />

      </Routes>
    </div>
  );
}

export default App;
