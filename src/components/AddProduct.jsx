import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createProducts } from '../service/productService';
import { listarCategory } from '../service/categoryService';
import { listUnit } from '../service/saleunitServvice';

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
    id_category: '',
    quantity: '',
    price: '',
    img: '',
    title: '',
    descripcion: '',
    id_saleUnit: '',
    id:'040600b9-6f0e-4259-922e-5b17ea97d6ad'
  });

  //llamar las categorias del back
  const [categorias, setCategorias] = useState([]);
  const [unidades, setUnidades] = useState([]);
  useEffect(() => {
    async function fetchCategorias(){
      try{
        const response = await listarCategory();
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorias: ', error)
      }
    }

    async function fetchUnidades(){
      try{
        const response = await listUnit();
        setUnidades(response.data);
      } catch (error){
        console.log('Error al traer unidadses', error)
      }
   }

    fetchUnidades();
    fetchCategorias();
  }, []);
  //Fin categorias


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if(name === 'img'){
      setProducto({ ...producto, img: files[0] });
    } else {
      setProducto({...producto, [name]: value});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id_category', producto.id_category);
    formData.append('quantity', producto.quantity);
    formData.append('price', producto.price);
    formData.append('img', producto.img);
    formData.append('title', producto.title);
    formData.append('descripcion', producto.descripcion);
    formData.append('id_saleUnit',producto.id_saleUnit);
    formData.append('id', '040600b9-6f0e-4259-922e-5b17ea97d6ad');

    try{
      const response = await createProducts(formData);
      window.location.reload();
      console.log('Producto creado con exito', response.data);
      setProducto({
        id_category: '',
        id_saleUnit: '',
        quantity: '',
        price: '',
        img: '',
        title: '',
        descripcion: '',
        id:'040600b9-6f0e-4259-922e-5b17ea97d6ad'
      });
    } catch (error){
      console.error('Error al crear producto: ',error);
      console.log(producto);
    }
  };

  return (
    <>
   <OpenModalButton onClick={() => setModalAbierto(true)}>Agregar Productos</OpenModalButton>
      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)}>
        <FormContainer onSubmit={handleSubmit}>
          <Title>Agregar Producto</Title>
          <FormGroup>
          <Label htmlFor="tipo">Categoria</Label>
          <Select id="id_category" name="id_category" value={producto.id_category} onChange={handleChange}>
            <option value="">Seleccione una categoria</option>
            {categorias.map(categorias => (
              <option key={categorias.id_category} value={categorias.id_category}>{categorias.category}</option>
            ))}
          </Select>
        </FormGroup>
              <FormGroup>
                <Label htmlForm="tipoUnit">Unidad de venta</Label>
                <Select id="id_saleUnit" name="id_saleUnit" value={producto.id_saleUnit} onChange={handleChange}>
                  <opinion value="">Unidad de venta</opinion>
                  {unidades.map(unidades =>(
                    <option key={unidades.id_saleUnit} value={unidades.id_saleUnit}>{unidades.unidad}</option>
                  ))}
                  

                </Select>
              </FormGroup>
        <FormGroup>
          <Label htmlFor="cantidad">Cantidad:</Label>
          <Input type="number" id="quantity" name="quantity" value={producto.quantity} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="precio">Precio:</Label>
          <Input type="number" id="price" name="price" value={producto.price} onChange={handleChange} step="0.01" min="0.01" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imagen">Imagen:</Label>
          <Input type="file" id="img" name="img" accept="image/png, image/jpeg" onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nombre">Titulo:</Label>
          <Input type="text" id="title" name="title" value={producto.title} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="descripcion">Descripción:</Label>
          <Input type="text" id="descripcion" name="descripcion" value={producto.descripcion} onChange={handleChange} />
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
  margin-top: 50px;
  margin-left: 30px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
`;