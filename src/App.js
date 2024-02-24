import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';
import Contact from './components/Contact';
import HelpSupport from './components/HelpSupport';
import Default from './components/Default';
import Login from './components/Login'; 
import Inicio from './components/Inicio';
import Productos from './components/Productos';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route path="/" exact component={Inicio} />
        <Route path="/login" component={Login} />
        <Route path="/contact" component={Contact} />
        <Route path="/helpsupport" component={HelpSupport} />
        <Route path="/addproduct" component={AddProduct} />
        <Route path="/productos" component={Productos} />
        <Route path="*" component={Default} />
      </Router>
    </div>
  );
}

export default App;
