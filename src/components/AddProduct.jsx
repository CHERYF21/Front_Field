  import React, { useState } from 'react';
  import styled from 'styled-components';
  import axios from 'axios';
  import Modal from './Modal';

  const AddProduct = ({ setAllProducts, allProducts }) => {
    const [producto, setProducto] = useState({
      category: '',
      quantity: '',
      price: '',
      img: '', // Guarda solo la URL de la imagen
      title: '',
      description: '',
      availability: true,
      opinion: '',
      ratings: '',
    });

     // Nuevo estado para rastrear el producto seleccionado para actualizar
  const [selectedProduct, setSelectedProduct] = useState(null);

   // Función para abrir el modal de actualización
   const openUpdateModal = (productId) => {
    // Encuentra el producto seleccionado para actualizar
    const productToUpdate = allProducts.find((product) => product.id === productId);
    // Establece el producto seleccionado en el estado
    setSelectedProduct(productToUpdate);
  };


  // Restablecer el producto seleccionado al cerrar el modal
  const closeUpdateModal = () => {
    setSelectedProduct(null);
  };

     const handleChange = (e) => {
    const { name, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];

      setProducto({
        ...producto,
        img: file, // Almacena el objeto File en lugar del nombre del archivo
        imgPreview: URL.createObjectURL(file),
      });
    } else {
      setProducto({ ...producto, [name]: e.target.value });
    }
  };



    const handleSubmit = async (e) => {
      e.preventDefault();

      // Validar campos obligatorios
      if (
        !producto.category ||
          !producto.quantity ||
          !producto.price ||
        !producto.img ||
        !producto.title ||
        !producto.description ||
        producto.availability === undefined
      ) {
        console.error('Todos los campos obligatorios deben ser completados');
        return;
      }

      const formData = new FormData();
      formData.append('file', producto.img);
      formData.append('title', producto.title);
      formData.append('description', producto.description);
      formData.append('price', producto.price);
      formData.append('category', producto.category);
      formData.append('availability', producto.availability);
      formData.append('quantity', producto.quantity);
      formData.append('opinion', producto.opinion);
      formData.append('ratings', producto.ratings);

      // Agregar campos opcionales si existen
      if (producto.opinion) {
        formData.append('opinion', producto.opinion);
      }
      if (producto.ratings) {
        formData.append('ratings', producto.ratings);
      }

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
          window.location.reload();
        } else {
          console.error('Error al agregar el producto. Estado:', response.status, 'Datos:', response.data);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }

      // Restablecer el estado del formulario
      setProducto({
        category: '',
        quantity: '',
        price: '',
        img: '',
        title: '',
        description: '',
        opinion: '',
        ratings: '',
      });
    };

    
    // Componente de eliminación separado
    const DeleteProduct = ({ productId, onDelete }) => {
      const handleDelete = async () => {
        try {
          if (productId) {
            // Lógica para eliminar un producto en el backend
            await axios.delete(`http://localhost:8080/api/products/${productId}`);
            onDelete(productId); // Notifica al componente padre que se ha eliminado el producto
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
    };

    

    return (
      <>
        <FormContainer onSubmit={handleSubmit} encType="multipart/form-data">
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
          {/* Vista previa de la imagen */}
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
          <FormGroup>
            <Label htmlFor="opinion">Opinión:</Label>
            <Input
              type="text"
              id="opinion"
              name="opinion"
              value={producto.opinion}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="ratings">Calificación:</Label>
            <Input
              type="number"
              id="ratings"
              name="ratings"
              value={producto.ratings}
              onChange={handleChange}
              min="1"
              max="5"
            />
          </FormGroup>
          <SubmitButton type="submit">Agregar</SubmitButton>
          
        </FormContainer>

            {/*Agregar actualizar antes del modal*/ }
        {allProducts &&
        allProducts.map((product) => (
          <ProductCard key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Cantidad: {product.quantity}</p>
            <p>Precio: {product.price}</p>
            <button onClick={() => openUpdateModal(product.id)}>Actualizar</button>
            {/* Agrega el componente DeleteProduct con la función handleDelete */}
            <DeleteProduct productId={product.id} onDelete={handleDelete} />
          </ProductCard>
        ))}

        {/* Modal para actualizar producto */}
      {selectedProduct && (
        <Modal
          closeModal={closeUpdateModal}
          productId={selectedProduct.id}
          onUpdate={(updatedProduct) => {
            // Actualizar el estado de todos los productos
            setAllProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
              )
            );
            // Cerrar el modal después de la actualización
            closeUpdateModal();
          }}
        />
      )}

        {/* Agregar ProductCard para envolver cada producto */}
      {allProducts && allProducts.map((product) => (
        <ProductCard key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Cantidad: {product.quantity}</p>
          <p>Precio: {product.price}</p>
          {/* Agrega el componente DeleteProduct con la función handleDelete */}
          <DeleteProduct productId={product.id} onDelete={handleDelete} />
        </ProductCard>
      ))}
      
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
  width: 250px; /* Ajusta el tamaño según tus preferencias */
  height: 200px; /* Ajusta el tamaño según tus preferencias */
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


  

  export default AddProduct;
