import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from './Modal';

const AddProduct = ({ setAllProducts, allProducts }) => {
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
    const { name, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];

      setProducto((prevProducto) => ({
        ...prevProducto,
        img: file,
        imgPreview: URL.createObjectURL(file),
      }));
    } else {
      setProducto((prevProducto) => ({
        ...prevProducto,
        [name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
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
        setAllProducts([...allProducts, response.data]);
        // Agregar el producto al carrito al agregarlo a la lista de productos
        addToCart(response.data);
        // Restablecer campos y cerrar el formulario
        setProducto({
          category: '',
          quantity: '',
          price: '',
          img: '',
          title: '',
          description: '',
        });
        setShowForm(false);
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
      <AddButton onClick={openForm}>Agregar Producto</AddButton>

      {showForm && (
        <FormContainer onSubmit={handleSubmit} encType="multipart/form-data">
          <CancelButton type="button" onClick={closeForm}>
            Cancelar
          </CancelButton>

          <FormGroup>
            <Label htmlFor="category">Categoría</Label>
            <Select
              id="category"
              name="category"
              value={producto.category}
              onChange={handleChange}
            >
              <option value="fruta">Fruta</option>
              <option value="verdura">Verdura</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="quantity">Cantidad:</Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={producto.quantity}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="price">Precio:</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={producto.price}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="img">Imagen:</Label>
            <Input
              type="file"
              id="img"
              name="file"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              required
            />
            {producto.imgPreview && (
              <PreviewImage src={producto.imgPreview} alt="Vista previa" />
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="title">Título:</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={producto.title}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Descripción:</Label>
            <Input
              type="text"
              id="description"
              name="description"
              value={producto.description}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="availability">Disponibilidad:</Label>
            <Select
              id="availability"
              name="availability"
              value={producto.availability}
              onChange={handleChange}
            >
              <option value={true}>Disponible</option>
              <option value={false}>No disponible</option>
            </Select>
          </FormGroup>

          <SubmitButton type="submit">
             Agregar
          </SubmitButton>
        </FormContainer>
      )}

      {allProducts && allProducts.map((product) => (
        <ProductCard key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Cantidad: {product.quantity}</p>
          <p>Precio: {product.price}</p>
          <button onClick={() => openUpdateModal(product.id)}>Actualizar</button>
          <DeleteProduct productId={product.id} onDelete={handleDelete} />
          <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
        </ProductCard>
      ))}

      {selectedProduct && (
        <Modal
          closeModal={closeUpdateModal}
          productId={selectedProduct.id}
          onUpdate={(updatedProduct) => {
            setAllProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
              )
            );
            closeUpdateModal();
          }}
        />
      )}
    </>
  );
};

const ProductCard = styled.div`
  // Estilos de la tarjeta de producto
`;

const FormContainer = styled.form`
  background-color: #f0f8f0;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const PreviewImage = styled.img`
  width: 250px;
  height: 200px;
  margin-top: 10px;
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

const AddButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #006400;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #004d00;
  }
`;

const CancelButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #cc0000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #990000;
  }
`;

export default AddProduct;

