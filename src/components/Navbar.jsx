import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, NavLink as RouterNavLink } from 'react-router-dom';  
import imagenes from '../assets/imagenes';
import { useAuth } from '../Context/AuthContext';


function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const {isAuthen, user} = useAuth();
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    

      <NavContainer>
        <ImageNavbar>
          <img src={imagenes.logo} alt="Logo" />
        </ImageNavbar>
        <Title>
          Field <Span>Market</Span>
        </Title>
        <MenuIcon onClick={toggleMenu}>
          <div />
          <div />
          <div />
        </MenuIcon>
        <NavLinks open={isMenuOpen}>
          <StyledNavLink to="/inicio">Inicio</StyledNavLink>
  
          { isAuthen && 
            <>
              <StyledNavLink to="/contact">Contacto</StyledNavLink>
             <StyledNavLink to="/productos">Productos</StyledNavLink>
             <StyledNavLink to="/funciones">Mi cuenta</StyledNavLink>
             {(user.rol == "Admin" || "Agricultor") && <StyledNavLink to="/admin">Admin</StyledNavLink> }
             
            </>
          } 
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
    position: relative;
  }
`;

const Title = styled.h2`
  color: #fff;
  font-family: inherit;
  margin-left: 70px;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-top: 0.5rem;
/
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
    display: ${({ open }) => (open ? 'flex' : 'none')};
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
    display: none; 
  }
`;

const MenuIcon = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  div {
    width: 25px;
    height: 3px;
    background-color: #fff;
    margin: 3px 0;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 15px;
    right: 15px;
  }
`;