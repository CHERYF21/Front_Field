import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import imagenes from '../assets/imagenes';

function Navbar() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <NavContainer>
        <div>
          {/* Agrega el logo */}
          <img src={imagenes.logo} alt="Imagen" className="img" />
          <nav>
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="helpsupport">Ayuda/Soporte</Link>
              </li>
              <li>
                <Link to="/contact">Contacto</Link>
              </li>
              <li>
                <Link to="/addproduct">Agregar Productos</Link>
              </li>
              <li>
                <Link to="/productos">Productos</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </NavContainer>
    </>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  padding: 0.4rem;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 80px;
    margin-right: 1rem; 
  }

  .ul{
    color: white;
    text-decoration: none;
    margin-right: 1rem;
  }

  @media (max-width: 768px) {
    /* Agrega estilos específicos para pantallas más pequeñas si es necesario */
  }
`;