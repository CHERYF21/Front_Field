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
import { AuthProvider } from './Context/AuthContext';
import BuyersList from './components/Buyers_List.jsx';
import User_Profile from './components/User_Profile.jsx';
import Admin from './components/Admin.jsx';
import UserList from './components/User_List.jsx';

function App() {
  return (
    <div>

      <AuthProvider>
        <Navbar />

        <Routes>
    
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/listproducts" element={<ListProduct />} />
          <Route path="/salelist" element={<SaleList />} />
          <Route path="/detail" element={<SaleDetail />} />
          <Route path="/funciones" element={<Funciones/>} />
          <Route path="/compradores" element={<BuyersList/>} />
          <Route path="/perfil" element={<User_Profile/>} />
          <Route path="/Admin" element={<Admin/>} />
          <Route path="/usuario" element={<UserList/>} />
          <Route path="*" element={<Default />} />
          <Route element={<Inicio />} /> {/* Ruta predeterminada */}

        </Routes>
      </AuthProvider>
    
    </div>
  );
}

export default App;
