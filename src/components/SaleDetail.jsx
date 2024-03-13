import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { listDetail, deleteDetail, updateDetail } from '../service/detailsaleService'; // Importa la función listDetail, deleteDetail y updateDetail
import EditDetailModal from './EditDetailModal';

const SaleDetail = () => {
  const [ventas, setVentas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  useEffect(() => {
    async function fetchDetailSales() {
      try {
        const response = await listDetail(); // Utiliza directamente listDetail
        setVentas(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de ventas', error);
      }
    }

    fetchDetailSales();
  }, []);

  const eliminarVenta = async (id) => {
    try {
      await deleteDetail(id);
      setVentas(ventas.filter(venta => venta.id_detail !== id));
      console.log('Venta eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
    }
  };

  const abrirModalEditarVenta = (venta) => {
    setVentaSeleccionada({
      cantidad: venta.quantity,
      precio: venta.unit_value,
      idVenta: venta.sale.id_sale,
      idProducto: venta.product.id_product
    });
    setModalOpen(true);
  };
  


  const cerrarModal = () => {
    setModalOpen(false);
  };

  const actualizarVenta = async (id, newData) => {
    try {
      await updateDetail(id, newData);
      setModalOpen(false);
      // Actualiza la lista de ventas después de la actualización
      const updatedVentas = ventas.map(venta => {
        if (venta.id_detail === id) {
          return {
            ...venta,
            ...newData
          };
        }
        return venta;
      });
      setVentas(updatedVentas);
      console.log('Venta actualizada con éxito');
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
    }
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
            <th>Nombre del Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(detaill => (
            <tr key={detaill.id_detail}>
              <td>{detaill.id_detail}</td>
              <td>{detaill.quantity}</td>
              <td>${detaill.unit_value.toFixed(2)}</td>
              <td>{detaill.sale.id_sale}</td>
              <td>{detaill.product.title}</td>
              <td>
              <Button bgColor="#2dafeb" onClick={() => abrirModalEditarVenta(detaill)}>Editar</Button>
              <Button bgColor="#ee2738" onClick={() => eliminarVenta(detaill.id_detail)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditDetailModal isOpen={modalOpen} onClose={cerrarModal} sale={ventaSeleccionada} onSubmit={actualizarVenta} />
    </Container>
  );
};

export default SaleDetail;

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
