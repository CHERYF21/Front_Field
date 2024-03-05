import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Default from './components/Default';
import Productos from './components/Productos.jsx';
import { Route, Routes } from 'react-router-dom';
import ListProduct from './components/ListProducts.jsx';
import Inicio from './components/Inicio.jsx';
import Funciones from './components/Funciones.jsx';
import SaleList from './components/SaleList.jsx';
import SaleDetail from './components/SaleDetail.jsx';

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
  
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/listproducts" element={<ListProduct />} />
        <Route path="/salelist" element={<SaleList />} />
        <Route path="/detail" element={<SaleDetail />} />
        <Route path="/funciones" element={<Funciones/>} />
        <Route path="*" element={<Default />} />

      </Routes>
    </div>
  );
}

export default App;
