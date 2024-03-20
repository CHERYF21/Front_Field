import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EditProductModal from './Editar_Producto';
import AddCategory from './AddCategory';
import EditarProducto from './Editar_Producto';
import { deleteProducts, listProducts } from '../service/productService';

const ListProduct = () => {
  const [productos, setProductos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5;

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await listProducts();
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
    }
  };

  const eliminarProducto = async (id_product) => {
    try {
      await deleteProducts(id_product);
      fetchProductos();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const abrirModalEditar = (producto) => {
    setProductoSeleccionado(producto);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const indicePrimerProducto = (paginaActual - 1) * productosPorPagina;
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);

  return (
    <TableContainer>
      <Title>
        <h2>Listado de productos Field <Span>Market</Span></h2>
      </Title>
      <SearchInput
        type="text"
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
        placeholder="Buscar por nombre..."
      />
      <Button bgColor="#006400" onClick={() => setFiltroNombre('')}>Limpiar</Button>
      <Button bgColor="#006400">Buscar</Button>
      <AddContainerWrapper>
        <AddContainer>
          <AddCategory />
        </AddContainer>
      </AddContainerWrapper>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Categoría</TableHeader>
            <TableHeader>Cantidad</TableHeader>
            <TableHeader>Descripción</TableHeader>
            <TableHeader>Precio</TableHeader>
            <TableHeader>Imagen</TableHeader>
            <TableHeader>Acciones</TableHeader>
          </tr>
        </thead>
        <tbody>
          {productosActuales.map((producto, index) => (
            <TableRow key={indicePrimerProducto + index}>
              <TableCell>{producto.id_product}</TableCell>
              <TableCell>{producto.title}</TableCell>
              <TableCell>{producto.category.category}</TableCell>
              <TableCell>{producto.quantity}</TableCell>
              <TableCell>{producto.descripcion}</TableCell>
              <TableCell>{producto.price}</TableCell>
              <TableCell>
                <img src={`data:image/jpeg;base64,${producto.img}`} style={{ width: '300px', height: '70px' }} />
              </TableCell>
              <TableCell>
                <ButtonContainer>
                  <Button className='editar' bgColor="#2dafeb" onClick={() => abrirModalEditar(producto)}>Editar</Button>
                  <Button bgColor="#ee2738" onClick={() => eliminarProducto(producto.id)}>Eliminar</Button>
                </ButtonContainer>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      <Pagination>
        <PageButton onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>&laquo; Anterior</PageButton>
        {Array.from({ length: Math.ceil(productos.length / productosPorPagina) }, (_, index) => (
          <PageButton key={index + 1} onClick={() => cambiarPagina(index + 1)} active={index + 1 === paginaActual}>
            {index + 1}
          </PageButton>
        ))}
        <PageButton onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === Math.ceil(productos.length / productosPorPagina)}>Siguiente &raquo;</PageButton>
      </Pagination>
      {productoSeleccionado && (
        <EditProductModal
          isOpen={modalOpen}
          onClose={cerrarModal}
          product={productoSeleccionado}
          reloadProductList={fetchProductos}
        />
      )}
    </TableContainer>
  );
}

export default ListProduct;

const TableContainer = styled.div`
  padding: 10px;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
`;

const Title = styled.h2`
  color: #fff;
  font-family: inherit;
  font-size: 15px;
  margin-top: 10px;
`;

const Span = styled.span`
  color: #1fc271;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
`;

const TableHeader = styled.th`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: white;
  width: 150px;
`;

const Button = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  border: none;
  padding: 8px 11px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 7px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
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

const AddContainerWrapper = styled.div`
  display: flex;
  gap: 1px;
  margin-top: -300px;
`;

const AddContainer = styled.div`
  width: 25%;
  padding: 10px;
  border-radius: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
