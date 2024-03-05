import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Importar axios
import EditSaleModal from './EditSaleModal';

const SaleList = () => {
  const [ventas, setVentas] = useState([
    { id: 1, fechaVenta: '2024-03-15', total: 150, pagado: true, vendedor: 'Juan' },
    { id: 2, fechaVenta: '2024-03-16', total: 200, pagado: false, vendedor: 'María' },
    { id: 3, fechaVenta: '2024-03-17', total: 100, pagado: true, vendedor: 'Pedro' },
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
      <Title>Lista de Ventas Field <Span>Market</Span></Title>
      <SearchInput
        type="text"
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
        placeholder="Buscar por nombre..."
      />
      <Button bgColor="#006400" onClick={() => setFiltroNombre('')}>Limpiar</Button>
      <Button bgColor="#006400">Buscar</Button>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Comprador</th>
            <th>Fecha Venta</th>
            <th>Total</th>
            <th>Pagado</th>
            <th>Vendedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta.id}>
              <td>{venta.id}</td>
              <td>{venta.fechaVenta}</td>
              <td>${venta.total}</td>
              <td>{venta.pagado ? 'Sí' : 'No'}</td>
              <td>{venta.vendedor}</td>
              <td>
                <Button bgColor="#2dafeb" onClick={() => abrirModalEditarVenta(venta)}>Editar</Button>
                <Button bgColor="#ee2738" onClick={() => eliminarVenta(venta.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditSaleModal isOpen={modalOpen} onClose={cerrarModal} sale={ventaSeleccionada} />
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
const SearchInput = styled.input`
  padding: 9px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px; 
  margin-bottom: 10px;
  margin-left: 400px;
  margin-right: 2px; 
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
