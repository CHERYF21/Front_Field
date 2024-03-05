import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Importar axios
import EditDetailModal from './EditDetailModal';
const SaleList = () => {
  const [ventas, setVentas] = useState([
    { id: 1, cantidad: '20 naranjas', precio: 150, idVenta: 101, idProducto: 201 },
    { id: 2, cantidad: '10 manzanas', precio: 200, idVenta: 102, idProducto: 202 },
    { id: 3, cantidad: '5 kg de plátanos', precio: 100, idVenta: 103, idProducto: 203 },
  ]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const eliminarVenta = (id) => {
    axios.delete(`/api/ventas/${id}`)
      .then(response => {
        setVentas(ventas.filter(venta => venta.id !== id));
        console.log('Venta eliminada con éxito');
      })
      .catch(error => {
        console.error('Error al eliminar la venta:', error);
      });
  };

  const abrirModalEditarVenta = (venta) => {
    setVentaSeleccionada(venta);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <Title>Lista de Detalle de Ventas Field <Span>Market</Span></Title>

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Cantidad</th>
            <th>Total de Productos (Precio)</th>
            <th>Id Venta</th>
            <th>Id Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta.id}>
              <td>{venta.id}</td>
              <td>{venta.cantidad}</td>
              <td>${venta.precio}</td>
              <td>{venta.idVenta}</td>
              <td>{venta.idProducto}</td>
              <td>
                <Button bgColor="#2dafeb" onClick={() => abrirModalEditarVenta(venta)}>Editar</Button>
                <Button bgColor="#ee2738" onClick={() => eliminarVenta(venta.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditDetailModal isOpen={modalOpen} onClose={cerrarModal} sale={ventaSeleccionada} />
    </Container>
  );
};

export default SaleList;

const Container = styled.div`
  padding: 10px;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
`;

const Title = styled.h2`
  color: #fff;
  font-family: inherit;
  font-size: 25px;
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

const Button = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  border: none;
  padding: 8px 11px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
`;
