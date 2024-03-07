import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EditProductModal from './Editar_Producto';
import AddCategory from './AddCategory';
import EditarProducto from './Editar_Producto';


const ListProduct = () => {
  const [productos, setProductos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/listProducts');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`);
      fetchProductos();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const abrirModalEditar = (producto) => {
    console.log('Producto:', producto);
  
    axios.get(`http://localhost:8080/user/${producto.id}`)
      .then(response => {
        console.log('Producto obtenido:', response.data);
  
        response.data.base64Image = btoa(String.fromCharCode.apply(null, new Uint8Array(response.data.img)));
        
        // Añade logs para asegurarte de que los datos están listos antes de abrir el modal
        console.log('Datos preparados, abriendo modal...');
        
        setProductoSeleccionado(response.data);
        setModalOpen(true);
      })
      .catch(error => {
        console.error('Error al obtener el producto:', error);
      });
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
            <TableHeader> description</TableHeader>
            <TableHeader>Precio</TableHeader>
            <TableHeader>Disponibilidad</TableHeader>
            <TableHeader>Imagen</TableHeader>
            <TableHeader>Acciones</TableHeader>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <TableRow key={producto.id}>
              <TableCell>{producto.id}</TableCell>
              <TableCell>{producto.title}</TableCell>
              <TableCell>{producto.category}</TableCell>
              <TableCell>{producto.quantity}</TableCell>
              <TableCell>{producto.description}</TableCell>
              <TableCell>${producto.price}</TableCell>
              <TableCell>{producto.availability ? 'Disponible' : 'No disponible'}</TableCell>
              <TableCell>
                <img src={`data:image/jpeg;base64,${producto.base64Image}`} alt={producto.nombre} style={{ width: '300px', height: '70px' }} />
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
      {console.log('productoSeleccionado:', productoSeleccionado)}
      
      {productoSeleccionado && (
    <EditProductModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      product={productoSeleccionado}
      reloadProductList={fetchProductos} // Pasa la función correcta
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
  display: flex; /* Hace que los botones estén en línea horizontalmente */
  justify-content: flex-start; /* Alinea los botones a la izquierda */
  align-items: center; /* Alinea los botones verticalmente al centro */
  `;