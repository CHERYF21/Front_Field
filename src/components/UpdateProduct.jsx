import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { updateProducts } from './../service/productService';
import { useForm } from 'react-hook-form';
import { data } from 'autoprefixer';

const UpdateProduct = ({isOpen, onClose, product}) => {

  const {register, handleSubmit, formState: { errors }} = useForm();

  const [editedProduct, setEditProduct] = useState ({
     img: product ? product.img:'',
     title: product ? product.title: '',
     price: product ? product.price:'',
     descripcion: product ? product.descripcion:'',
     quantity: product ? product.quantity:''
  });

  const onSubmit = async (data) => {
    console.log("entramos en el submit");
    try{
      await updateProducts(product.id_product, data);
      console.log('Producto actualizado con exito');
      onClose();
    } catch (error){
      console.log('Error al actualizar el producto', error);
    }
  };

  console.log(product);

  
    return (
      <>
        {isOpen && product && (
          <ModalContainer>
              <ModalContent>
                  <ModalCloseButton onClick={onClose}>Cerrar</ModalCloseButton>
                  <h2>Editar Producto</h2>
                  <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <FormField>
                        <Label>Imagen</Label>
                        <Input
                          type="file"
                          {...register('img', {required: false})}
                        />
                        {errors.date_product && <p>este campo es obligatorio</p>}
                    </FormField>
                    <FormField>
                        <Label>Titulo: </Label>
                        <Input
                          type='text'
                          {...register('title', {required: false})}
                        />
                        {errors.title_product && <p>este campo es obligatorio</p>}
                    </FormField>
                    <FormField>
                        <Label>Precio: </Label>
                        <Input
                          type='text'
                          {...register('price', {required: false})}
                        />
                        {errors.price_product && <p>este campo es obligatorio</p>}
                    </FormField>
                    <FormField>
                        <Label>Descripcion: </Label>
                        <Input
                          type='text'
                          {...register('descripcion', {required: false})}
                        />
                        {errors.descripcion_product && <p>este campo es obligatorio</p>}
                    </FormField>
                    <FormField>
                      <Label>Cantidad: </Label>
                      <Input
                        type='numbre'
                        {...register('quantity',{required: false})}
                      />
                      {errors.quantity_product && <p>Este campo es obligatorio</p>}
                    </FormField>
                    <Button type="submit">Guardar cambios</Button>
                  </Form>
              </ModalContent>
          </ModalContainer>
        )}
      </>
    );
  }

  const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
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


export default UpdateProduct;