import React from 'react';
import styled from 'styled-components';
import { NavLink, NavLink as RouterNavLink } from 'react-router-dom';  

function Navbar() {
  return (
    <NavContainer>
      <Title>
        Field <Span>Market</Span>
      </Title> 
      <NavLinks>
        <StyledNavLink to="/helpsupport">Ayuda/Soporte</StyledNavLink>
        <StyledNavLink to="/contact">Contacto</StyledNavLink>
        <StyledNavLink to="/addproduct">Agregar Productos</StyledNavLink>
        <StyledNavLink to="/productos">Productos</StyledNavLink>
        
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
  align-items: center;
  width: 100%;
  z-index: 1000;
  margin-top: 50px; 
`;


const Title = styled.h2`
  color: #fff;
  font-family: inherit;
`;

const Span = styled.span`
  color: #1fc271;
`;

const NavLinks = styled.div`
  display: flex;
`;

const StyledNavLink = styled(RouterNavLink)`
  color: #fff;
  text-decoration: none;
  margin-left: 1rem;

  &:hover {
    color: #1fc271;
  }

  &.active {
    font-weight: bold;
  }
`;
