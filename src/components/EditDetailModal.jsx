import React, { useState } from 'react';
import styled from 'styled-components';
import { updateDetail } from '../service/detailsaleService';
import { useForm } from 'react-hook-form';

function EditDetailModal({ isOpen, onClose, sale }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [editedSale, setEditedSale] = useState({
    cantidad: sale ? sale.cantidad : '',
    precio: sale ? sale.precio : ''
  });

  const onSubmit = async (formData) => {
    console.log("Entramos en onSubmit");
    try {
      await updateDetail(sale.id, formData); // Aquí se usa 'sale.id' en lugar de 'sale.id_sale'
      console.log('Detalle de venta actualizado con éxito');
      onClose(); // Cierra el modal
    } catch (error) {
      console.error('Error al actualizar el detalle de venta:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSale({
      ...editedSale,
      [name]: value
    });
  };

  return (
    <>
      {isOpen && sale && (
        <ModalContainer>
          <ModalContent>
            <ModalCloseButton onClick={onClose}>Cerrar</ModalCloseButton>
            <h2>Editar Detalle de Venta</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormField>
                <Label>Cantidad:</Label>
                <Input type="text" name="cantidad" value={editedSale.cantidad} onChange={handleInputChange} />
              </FormField>
              <FormField>
                <Label>Total de Productos (Precio):</Label>
                <Input type="number" name="precio" value={editedSale.precio} onChange={handleInputChange} />
              </FormField>
              <Button type="submit">Guardar cambios</Button>
            </Form>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}

export default EditDetailModal;

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
