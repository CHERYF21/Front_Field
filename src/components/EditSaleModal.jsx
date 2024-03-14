import React, { useState } from 'react';
import styled from 'styled-components';
import { updateSale } from '../service/saleService';
import { useForm } from 'react-hook-form' //IMPORTAR LIBRERIA


function EditSaleModal({ isOpen, onClose, sale }) {

  const { register, handleSubmit, formState: { errors } } = useForm(); //TRAEMOS LOS METODOS NECESARIOS

  const [editedSale, setEditedSale] = useState({
    date_sale: sale ? sale.date_sale : '',
    total_paid: sale ? sale.total_paid : 0,
    usuario: sale ? sale.usuario?.nombre : ''
  });

 

  const onSubmit = async (data) => {
    console.log("entramos en onsubmit");
    try {


      await updateSale(sale.id_sale, data);
      window.location.reload();
      console.log('Venta actualizada con éxito');
      onClose(); // Cierra el modal
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
    }
  };

  console.log(sale);

  return (
    <>
      {isOpen && sale && (
        <ModalContainer>
          <ModalContent>
            <ModalCloseButton onClick={onClose}>Cerrar</ModalCloseButton>
            <h2>Editar Venta</h2>
            <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <FormField>
                <Label>Fecha de Venta:</Label>
                <Input
                  type="text"
                  {...register('data_sale', { required: false })}
                />
                {errors.date_sale && <p> Este campo es obligatorio </p>}
              </FormField>
              <FormField>
                <Label>Total a pagar:</Label>
                <Input
                  type="number"
                  {...register('total_paid', { required: false})} />
                {errors.date_sale && <p> Este campo es obligatorio </p>}
              </FormField>
              <Button type="submit">Guardar cambios</Button>
            </Form>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}

export default EditSaleModal;

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
