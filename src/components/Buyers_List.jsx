import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const BuyersList = () => {
  
    const buyersData = [
        { producto: 'Producto 1', monto: '$100', fecha: '2024-03-16' },
        { producto: 'Producto 2', monto: '$150', fecha: '2024-03-17' },
        { producto: 'Producto 3', monto: '$80', fecha: '2024-03-18' },
        { producto: 'Producto 4', monto: '$200', fecha: '2024-03-19' },
      ];

  return (
    <Container>
      <Title>
        <h2>Listado de tus compras Field <Span>Market</Span></h2>
      </Title>
      <Table>
        <thead>
          <tr>
            <th>Nombre del Producto</th>
            <th>Monto Pagado</th>
            <th>Fecha de Compra</th>
          </tr>
        </thead>
        <tbody>
          {buyersData.map((buyer, index) => (
            <tr key={index}>
              <td>{buyer.producto}</td>
              <td>{buyer.monto}</td>
              <td>{buyer.fecha}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button bgColor="#ee2738">
           <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>Quiero hacer un reclamo!</Link>
         </Button>
    </Container>
  );
};

export default BuyersList;

const Container = styled.div`
  padding: 10px;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
`;


const Title = styled.h2`
  color: #fff;
  font-family: inherit;
  font-size: 20px;
  margin-top: 10px;
`;

const Span = styled.span`
  color: #1fc271;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;


const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: white;
`;

const Button = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  border: none;
  padding: 8px 11px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 100px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
  margin-top: 10px;
`;