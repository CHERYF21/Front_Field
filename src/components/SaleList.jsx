import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EditSaleModal from './EditSaleModal';
import { listSale, updateSale, deleteSale } from '../service/saleService';

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const ventasPorPagina = 5;
  const indicePrimerVenta = (paginaActual - 1) * ventasPorPagina;
  const indiceUltimaVenta = paginaActual * ventasPorPagina;
  const ventasActuales = sales.slice(indicePrimerVenta, indiceUltimaVenta);

  useEffect(() => {
    async function fetchSales() {
      try {
        const response = await listSale();
        setSales(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de ventas', error);
      }
    }

    fetchSales();
  }, []);

  const handleEliminarVenta = (id_sale) => {
    deleteSale(id_sale)
      .then(response => {
        setSales(sales.filter(sale => sale.id_sale !== id_sale));
        console.log('Venta eliminada con éxito');
      })
      .catch(error => {
        console.error('Error al eliminar la venta:', error);
      });
  };

  const actualizarVenta = async (ventaActualizada) => {
    try {
      const response = await updateSale(ventaActualizada.id_sale, ventaActualizada);
      console.log('Venta Actualizada', response.data);

      const updateSales = sales.map(sale => {
        if (sale.id_sale === ventaActualizada.id_sale) {
          return response.data;
        }
        return sale;
      });

      setSales(updateSales);
      setModalOpen(false);
    } catch (error) {
      console.log('Error al actualizar venta', error);
    }
  };

  const abrirModalEditarVenta = (venta) => {
    setVentaSeleccionada(venta);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

 

  return (
    <Container>
      <Title>Lista de Ventas Field <Span>Market</Span></Title>

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Cantidad</th>
            <th>Total de Productos (Precio)</th>
            <th>Comprador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventasActuales.map(sale => (
            <tr key={sale.id_sale}>
              <td>{sale.id_sale}</td>
              <td>{sale.date_sale}</td>
              <td>{sale.total_paid}</td>
              <td>{sale.usuario?.nombre} {sale.usuario?.apellido}</td>
              <td>
                <Button bgColor="#2dafeb" onClick={() => abrirModalEditarVenta(sale)}>Editar</Button>
                <Button bgColor="#ee2738" onClick={() => handleEliminarVenta(sale.id_sale)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PageButton onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>&laquo; Anterior</PageButton>
        {Array.from({ length: Math.ceil(sales.length / ventasPorPagina) }, (_, index) => (
          <PageButton key={index + 1} onClick={() => cambiarPagina(index + 1)} active={index + 1 === paginaActual}>
            {index + 1}
          </PageButton>
        ))}
        <PageButton onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === Math.ceil(sales.length / ventasPorPagina)}>Siguiente &raquo;</PageButton>
      </Pagination>
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
