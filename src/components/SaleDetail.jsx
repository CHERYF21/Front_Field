import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { listDetail, deleteDetail, updateDetail } from '../service/detailsaleService';
import EditDetailModal from './EditDetailModal';

const SaleDetail = () => {
  const [ventas, setVentas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const ventasPorPagina = 5; // Cambia el número según tus necesidades

  useEffect(() => {
    async function fetchDetailSales() {
      try {
        const response = await listDetail();
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

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const indicePrimerVenta = (paginaActual - 1) * ventasPorPagina;
  const indiceUltimaVenta = paginaActual * ventasPorPagina;
  const ventasActuales = ventas.slice(indicePrimerVenta, indiceUltimaVenta);

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
            <th>img</th>
            <th>Nombre del Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventasActuales.map(detaill => (
            <tr key={detaill.id_detail}>
              <td>{detaill.id_detail}</td>
              <td>{detaill.quantity}</td>
              <td>${detaill.unit_value.toFixed(2)}</td>
              <td>{detaill.sale.id_sale}</td>
              <th><img src={`data:image/jpeg;base64,${detaill.product.img}`} alt={detaill.product.title} /></th>
              <td>{detaill.product.title}</td>
              <td>
                <Button bgColor="#2dafeb" onClick={() => abrirModalEditarVenta(detaill)}>Editar</Button>
                <Button bgColor="#ee2738" onClick={() => eliminarVenta(detaill.id_detail)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PageButton onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>&laquo; Anterior</PageButton>
        {Array.from({ length: Math.ceil(ventas.length / ventasPorPagina) }, (_, index) => (
          <PageButton key={index + 1} onClick={() => cambiarPagina(index + 1)} active={index + 1 === paginaActual}>
            {index + 1}
          </PageButton>
        ))}
        <PageButton onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === Math.ceil(ventas.length / ventasPorPagina)}>Siguiente &raquo;</PageButton>
      </Pagination>
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

const Pagination = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  background-color: ${({ active }) => (active ? '#004d00' : '#006400')};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#004d00' : '#004d00')};
  }
`;

