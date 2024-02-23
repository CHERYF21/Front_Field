import React, { useEffect, useState } from "react";
import styled from 'styled-components';

function RightSidebar() {
    return (
      <SidebarContainer>
        <CardContainer>
          <Card>
            
            <CardContent>
              <Header>Metodos de Pagos Seguros</Header>
              <Icon className="fas fa-lock" />
              <Description>Ofrecemos métodos de pago seguros para garantizar la seguridad de tus transacciones.</Description>
              <br />
              <SubmitButton type="submit"> Conocé sobre nuestro metodo de pago</SubmitButton>
            </CardContent>
          </Card>
          <Card>
     
            <CardContent>
              <Header>Tenemos Productos Frescos</Header>
              <Icon className="fas fa-leaf" />
              <Description>Trabajamos con proveedores de confianza para ofrecerte los productos más frescos y de la mejor calidad.</Description>
            </CardContent>
          </Card>
          <Card>
           
            <CardContent>
              <Header>Los Mejores Precios</Header>
              <Icon className="fas fa-dollar-sign" />
              <Description>Buscamos constantemente los mejores precios para que puedas ahorrar en tus compras diarias.</Description>
            </CardContent>
          </Card>
          <Card>
           
            <CardContent>
              <Header>Ingresa de Forma Segura</Header>
              <Icon className="fas fa-user-shield" />
              <Description className='descripcion'>Garantizamos la seguridad de tu cuenta y tus datos personales con medidas de protección avanzadas.</Description>
             
            </CardContent>
          </Card>
        </CardContainer>
      </SidebarContainer>
    );
  }
  
  export default RightSidebar;
  
  const SidebarContainer = styled.div`
    background-color: #333;
    padding: 20px;
    border-radius: 8px;
  `;
  
  const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  
  `;
  
  const Card = styled.div`
   background-color: #333;
    border-radius: 8px;
    padding: 50px;
    width: 100%; /* Ajusta el ancho según tu preferencia */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `;
  
  const Icon = styled.i`
    color: #5cb85c; 
    font-size: 30px;
    margin-bottom: 10px;
  `;
  
  const CardContent = styled.div`
    flex-grow: 1;
  
    .descripcion{
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
    
  `;
  
  const Header = styled.h3`
    color:white;
    font-size: 18px;
    margin-bottom: 10px;
  `;
  
  
  const Description = styled.p`
    color: white;
    font-size: 14px;
  `;
  const SubmitButton = styled.button`
    width: 100%;
    padding: 5px;
    background-color: #b3ceec; 
    color: #332f2f;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #80b2eb75; 
    }
  `;