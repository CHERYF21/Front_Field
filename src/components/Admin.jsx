import React from 'react';
import styled from 'styled-components';
import imagenes from '../assets/imagenes';
import { Link } from 'react-router-dom';

const Admin= () => {
  
  return (
    <Container>
        <Title>
          <h2>Funciones de Adminstrador Field  <Span>Market</Span></h2>
        </Title>
        <CardsContainer>
          <StyledLink to={"/usuario"}>
            <StyledCard>
              <img src={imagenes.img2} alt="Productos" />
              <h2> Usuarios</h2>
            </StyledCard>
          </StyledLink>
          <StyledLink to={"/salelist"}>
            <StyledCard>
              <img src={imagenes.venta} alt="Ventas" />
              <h2>Ventas </h2>
            </StyledCard>
          </StyledLink>
          <StyledLink to={"/detail"}>
            <StyledCard>
              <img src={imagenes.detalle} alt="Detalle de venta" />
              <h2>Detalle de ventas</h2>
            </StyledCard>
          </StyledLink>
        </CardsContainer>
      </Container>
  );
};

export default Admin;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 45px;
 
`;


const Title = styled.h2`
  color: #fff;
  font-family: inherit;
  margin-left: 70px;
  text-align: center;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-top: 0.5rem;
/
  }
`;

const Span = styled.span`
  color: #1DD848;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap; 
  justify-content: center; 
  gap: 20px; 

`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledCard = styled.div`
  padding: 10px;
  width: 300px; 
  height: 310px; 
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  img {
    width: 100%; 
    border-radius: 10%;
    margin-bottom: 10px;
  }

  h2 {
    text-shadow: 0 0 10px #1DD848;
  }

  @media (max-width: 768px) {
    width: 90%; 
    margin-bottom: 20px; 
  }
`;
