import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EditProductModal from './Editar_Producto';
import AddProduct from './AddProduct'; 
import AddCategory from './AddCategory'; 
const ListProduct = () => {
  const [productos, setProductos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [modalOpen, setModalOpen] = useState(false); 
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalAgregarProductoAbierto, setModalAgregarProductoAbierto] = useState(false);

  useEffect(() => {
    // Datos de prueba para productos
    const productosPrueba = [
      { id: 1, nombre: 'Producto 1', categoria: 'Categoría 1', precio: 10, imagen: 'imagen1.jpg' },
      { id: 2, nombre: 'Producto 2', categoria: 'Categoría 2', precio: 20, imagen: 'imagen2.jpg' },
      { id: 3, nombre: 'Producto 3', categoria: 'Categoría 3', precio: 30, imagen: 'imagen3.jpg' }
    ];
    
    // Establecer los datos de prueba como el estado de los productos
    setProductos(productosPrueba);
  }, []);

  const eliminarProducto = (id) => {
    axios.delete(`/api/productos/${id}`)
      .then(response => {
        setProductos(productos.filter(producto => producto.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el producto:', error);
      });
  };
  
  const abrirModalEditar = (producto) => {
    setProductoSeleccionado(producto);
    setModalOpen(true); 
  };

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
        <AddProduct />
      </AddContainer>
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
            <TableHeader>Precio</TableHeader>
            <TableHeader>Imagen</TableHeader>
            <TableHeader>Acciones</TableHeader>

          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <TableRow key={producto.id}>
              <TableCell>{producto.id}</TableCell>
              <TableCell>{producto.nombre}</TableCell>
              <TableCell>{producto.categoria}</TableCell>
              <TableCell>{producto.precio}</TableCell>
              <TableCell>
                <img src={producto.imagen} alt={producto.nombre} style={{ width: '50px', height: '50px' }} />
              </TableCell>
              <TableCell>
                <Button bgColor="#2dafeb" onClick={() => abrirModalEditar(producto)}>Editar</Button>
                <Button bgColor="#ee2738" onClick={() => eliminarProducto(producto.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      {modalOpen && <EditProductModal isOpen={modalOpen} onClose={() => setModalOpen(false)} product={productoSeleccionado} />}
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
  padding: 8px;
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
  margin-right: 5px;
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