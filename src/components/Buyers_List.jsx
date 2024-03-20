import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BuyersList = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const compradoresPorPagina = 5;

  const buyersData = [
    { producto: 'Producto 1', monto: '$100', fecha: '2024-03-16' },
    { producto: 'Producto 2', monto: '$150', fecha: '2024-03-17' },
    { producto: 'Producto 3', monto: '$80', fecha: '2024-03-18' },
    { producto: 'Producto 4', monto: '$200', fecha: '2024-03-19' },
  ];

  const indicePrimerComprador = (paginaActual - 1) * compradoresPorPagina;
  const indiceUltimoComprador = paginaActual * compradoresPorPagina;
  const compradoresActuales = buyersData.slice(indicePrimerComprador, indiceUltimoComprador);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

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
          {compradoresActuales.map((comprador, index) => (
            <tr key={indicePrimerComprador + index}>
              <TableCell>{comprador.producto}</TableCell>
              <TableCell>{comprador.monto}</TableCell>
              <TableCell>{comprador.fecha}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PageButton onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>&laquo; Anterior</PageButton>
        {Array.from({ length: Math.ceil(buyersData.length / compradoresPorPagina) }, (_, index) => (
          <PageButton key={index + 1} onClick={() => cambiarPagina(index + 1)} active={index + 1 === paginaActual}>
            {index + 1}
          </PageButton>
        ))}
        <PageButton onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === Math.ceil(buyersData.length / compradoresPorPagina)}>Siguiente &raquo;</PageButton>
      </Pagination>
      <Button bgColor="#1e6340">
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

const Pagination = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  background-color: ${({ active }) => active ? '#004d00' : '#006400'};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);

  &:hover {
    background-color: ${({ active }) => active ? '#004d00' : '#004d00'};
  }
`;
