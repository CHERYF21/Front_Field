import React from 'react';
import styled from 'styled-components';
import { NavLink, NavLink as RouterNavLink } from 'react-router-dom';  
import imagenes from '../assets/imagenes';

function Navbar() {
  return (
    <NavContainer>
      <ImageNavbar>
        <img src={imagenes.logo} alt="Logo" />
      </ImageNavbar> 
      <Title>
        Field <Span>Market</Span>
      </Title>
      <NavLinks>
        <StyledNavLink to="/inicio">Inicio</StyledNavLink>
        <StyledNavLink to="/contact">Contacto</StyledNavLink>
        <StyledNavLink to="/productos">Productos</StyledNavLink>
        <StyledNavLink to="/funciones">Funciones</StyledNavLink>
      </NavLinks>
    </NavContainer>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  padding: 10px;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 1000;
  margin-top: 5px; 

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const Title = styled.h2`
  color: #fff;
  font-family: inherit;
  margin-left: 70px;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-top: 0.5rem;
  }
`;

const Span = styled.span`
  color: #1DD848;
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

const ImageNavbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  margin-right: 5px; 
  position: absolute;
  width: 60px;

  img {
    max-width: 100%;
  }

  @media screen and (max-width: 768px) {
    margin: 0 auto;
    margin-bottom: 1rem;
  }
`;
