import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import imagenes from '../assets/imagenes';

function Navbar() {
  return (
    <NavContainer>
      <LogoContainer>
        <Title>
          Field <Span>Market</Span>
        </Title>
        <Logo src={imagenes.logo} alt="Logo" />   
      </LogoContainer>
      <NavLinks>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/helpsupport">Ayuda/Soporte</NavLink>
        <NavLink to="/contact">Contacto</NavLink>
        <NavLink to="/addproduct">Agregar Productos</NavLink>
        <NavLink to="/productos">Productos</NavLink>
        <NavLink to="/login">Login</NavLink>
      </NavLinks>
    </NavContainer>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  padding: 1rem;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  color: #fff;
  font-family: inherit;
`;

const Span = styled.span`
  color: #1fc271;
`;

const Logo = styled.img`
  height: auto;
  width: 80px;
  margin-left: 1rem;
  border-radius: 50%; 
`;

const NavLinks = styled.div`
  display: flex;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-left: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ddd;
  }
`;
