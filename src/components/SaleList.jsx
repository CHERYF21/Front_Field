import React, { useState , useEffect} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios'; 
import EditSaleModal from './EditSaleModal';
import { listSale, updateSale } from '../service/saleService'; 
import { deleteSale } from '../service/saleService';
const SaleList = () => {

  const [sales, setSales] = useState([]); 
  const [modalOpen, setModalOpen] = useState(false); 
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null); 
  // Lista ventas
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

  //Find Usuarios 

  //kate 
  //eliminar
  const handleEliminarVenta= (id_sale) => {
      
     deleteSale(id_sale)
      .then(response => {   
    
        setSales(sales.filter(sale => sale.id_sale !== id_sale)); 
        console.log('Venta eliminada con éxito');
       
      })
      .catch(error => {
        console.error('Error al eliminar la venta:', error);
      });
    
  };

  //actualizar ventas
  const actualizarVenta = async(ventaActualizada) => {
    try{
      const response = await updateSale(ventaActualizada.id_sale, ventaActualizada);
      console.log('Venta Actualizada', response.data);

      const updateSales = sales.map(sale => {
        if(sale.id_sale === ventaActualizada.id_sale){
          return response.data;
        }
        return sale;
      });

      setSales(updateSales);
      setModalOpen(false);
    } catch (error) {
      console.log('Error al actualizar venta' , error);
    }
  }

 

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
      {/* <SearchInput
        type="text"
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
        placeholder="Buscar por nombre..."
      />
      <Button bgColor="#006400" onClick={() => setFiltroNombre('')}>Limpiar</Button>
      <Button bgColor="#006400">Buscar</Button> */}
      <Table>
        <thead>
          <tr>
            <th>Id_sale</th>
            <th>Fecha Venta</th>
            <th>Total a pagar</th>
            <th>Usuario</th>
            <th>Acciones</th> 
          </tr>
        </thead>
        <tbody>
        {sales.map(sale => (
      <tr key={sale.id_sale}>
      <td>{sale.id_sale}</td>
      <td>{sale.date_sale}</td>
       <td>{sale.total_paid}</td>
       <td>{sale.usuario?.nombre}</td> 
      <td>
      <Button bgColor="#2dafeb" onClick={() => abrirModalEditarVenta(sale)}>Editar</Button> 
      <Button bgColor="#ee2738" onClick={() => handleEliminarVenta(sale.id_sale)}>Eliminar</Button>
      </td>
          {console.log(sale)}
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