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
          <StyledNavLink to="/inicio">Inicio</StyledNavLink>
        <StyledNavLink to="/helpsupport">Ayuda/Soporte</StyledNavLink>
        <StyledNavLink to="/contact">Contacto</StyledNavLink>
        <StyledNavLink to="/productos">Productos</StyledNavLink>
        <StyledNavLink to="/listproduct">Listar Productos</StyledNavLink>
      
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

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5rem;
  }
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

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 1rem;
  }
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

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 0.5rem;
  }
`;
