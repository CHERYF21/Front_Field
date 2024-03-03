import React from 'react';
import styled from 'styled-components';
import imagenes from '../assets/imagenes';
import { Link } from 'react-router-dom';

const Admin= () => {
  
  return (
    <div>

      <h1>¿Que quieres hacer el dia de hoy?</h1>
      <div className="cards-container">
        <Link  to={"/listproducts"}>
        <StyledCard>
          <img src={imagenes.img} alt="Agregar productos" />
          <h2>Agregar Productos</h2>
        </StyledCard>
        
        </Link>
        
      
      </div>
    </div>
  );
};

export default Admin;
const StyledCard = styled.div`
  width: 300px;
  height: 200px;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
  }

  img {
    width: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
`;