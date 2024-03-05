import React, { useState } from 'react';
import styled from 'styled-components';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        {children}
        <CloseButton onClick={onClose}>X</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const AddProduct = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [producto, setProducto] = useState({
    category: '',
    quantity: '',
    price: '',
    img: '',
    title: '',
    description: '',
    availability: true,
   });
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


 
  const openForm = () => {
    setShowForm(true);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const closeForm = () => {
    setShowForm(false);
    setProducto({
      category: '',
      quantity: '',
      price: '',
      img: '',
      title: '',
      description: '',
    });
  };

  const openUpdateModal = (productId) => {
    const productToUpdate = allProducts.find((product) => product.id === productId);
    setSelectedProduct(productToUpdate);
    setShowForm(true);
  };

  const closeUpdateModal = () => {
    setSelectedProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    window.location.reload();
  
    if (
      !producto.category ||
      !producto.quantity ||
      !producto.price ||
      !producto.img ||
      !producto.title ||
      !producto.description ||
      producto.availability === null || // Modificado para incluir null
      producto.availability === undefined
    ) {
      console.error('Todos los campos obligatorios deben ser completados');
      console.error('Valores del producto:', producto);
      return;
    }
  
    const formData = new FormData();
    formData.append('file', producto.img); // Usa 'file' en lugar de 'img'
    formData.append('title', producto.title);
    formData.append('description', producto.description);
    formData.append('price', producto.price);
    formData.append('category', producto.category);
    formData.append('availability', producto.availability);
    formData.append('quantity', producto.quantity);
  
    try {
      const response = await axios.post(
        'http://localhost:8080/api/products/createProduct',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.status === 201) {
        console.log('Producto agregado con éxito:', response.data);

       
          // Agregar mensajes de depuración
      console.log('Tipo de setAllProducts:', typeof setAllProducts);
      console.log('Valor de setAllProducts:', setAllProducts);


        
      // Actualiza el estado y fuerza el re-renderizado
      setAllProducts((prevProducts) => {
        console.log('Previos Productos:', prevProducts);
        return [...prevProducts, response.data];
      });

         // Restablecer campos y cerrar el formulario
         setProducto({
          category: '',
          quantity: '',
          price: '',
          img: '',
          title: '',
          description: '',
        });
      } else {
        console.error('Error al agregar el producto. Estado:', response.status, 'Datos:', response.data);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  

  const DeleteProduct = ({ productId, onDelete }) => {
    const handleDelete = async () => {
      try {
        if (productId) {
          await axios.delete(`http://localhost:8080/api/products/${productId}`);
          onDelete(productId);
        } else {
          console.error('El productId es undefined o null');
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    };

    return (
      <button onClick={handleDelete}>Eliminar</button>
    );
  };

  const handleDelete = (productId) => {
    setAllProducts((prevList) => prevList.filter((product) => product.id !== productId));
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  return (
    <>
   <OpenModalButton onClick={() => setModalAbierto(true)}>Agregar Productos</OpenModalButton>
      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)}>
        <FormContainer onSubmit={handleSubmit}>
          <Title>Agregar Producto</Title>
          <FormGroup>
          <Label htmlFor="tipo">Categoria</Label>
          <Select id="tipo" name="tipo" value={producto.tipo} onChange={handleChange}>
            <option value="fruta">Fruta</option>
            <option value="verdura">Verdura</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="cantidad">Cantidad:</Label>
          <Input type="number" id="cantidad" name="cantidad" value={producto.cantidad} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="precio">Precio:</Label>
          <Input type="number" id="precio" name="precio" value={producto.precio} onChange={handleChange} step="0.01" min="0.01" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imagen">Imagen:</Label>
          <Input type="file" id="imagen" name="imagen" accept="image/png, image/jpeg" onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nombre">Titulo:</Label>
          <Input type="text" id="nombre" name="nombre" value={producto.nombre} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="descripcion">Descripción:</Label>
          <Input type="text" id="descripcion" name="descripcion" value={producto.descripcipn} onChange={handleChange} />
        </FormGroup>
        <SubmitButton type="submit">Agregar</SubmitButton>
        </FormContainer>
      </Modal>
    </>
  );
};

export default AddProduct;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%; 
  overflow: auto; 
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const FormContainer = styled.form`
  background-color: #f0f8f0; 
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #006400; 
  text-align: center;
`;
const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #006400; 
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #006400; 
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #004d00; 
  }
`;
const OpenModalButton = styled.button`
  background-color: #006400; 
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 300px;
  margin-left: 30px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
`;
