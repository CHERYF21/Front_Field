import React, { useState } from 'react';
import styled from 'styled-components';
import { updateSale } from '../service/saleService';



function EditSaleModal({ isOpen, onClose, sale }) {
  const [editedSale, setEditedSale] = useState({
    date_sale: sale ? sale.date_sale : '',
    total_paid: sale ? sale.total_paid : 0,
    // pagado: sale ? sale.pagado : false,
    usuario: sale ? sale.id : ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSale({
      ...editedSale,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    window.location.reload();
    e.preventDefault();
    try{
      console.log("Datos Actualizados con exito: " ,editedSale)
      await updateSale(sale.id_sale, editedSale);
      console.log('Ventan actualizada con exito');
      onClose();
    } catch (error){
      console.log('Error al actualizar la venta', error);
    }
  };

  return (
    <>
      {isOpen && sale && ( // Verifica que sale no sea null
        <ModalContainer>
          <ModalContent>
            <ModalCloseButton onClick={onClose}>Cerrar</ModalCloseButton>
            <h2>Editar Venta</h2>
            <Form onSubmit={handleSubmit}>
              <FormField>
                <Label>Fecha de Venta:</Label>
                <Input 
                  type="text" 
                  name="date_sale" 
                  value={editedSale.date_sale} 
                  onChange={handleInputChange} />
              </FormField>
              <FormField>
                <Label>Total:</Label>
                <Input 
                  type="number" 
                  name="total_paid" 
                  value={editedSale.total_paid} 
                  onChange={handleInputChange} />
              </FormField>
              {/* <FormField>
              <Label>Pagado:</Label>
                 <Select name="pagado" value={editedSale.pagado} onChange={handleInputChange}>
                       <option value="Si">Si</option>
                       <option value="No">No</option>
                   </Select>
                 </FormField> */}
              {/* <FormField>
                <Label>Vendedor:</Label>
                <Input 
                  type="text" 
                  name="usuario" 
                  value={editedSale.usuario} 
                  onChange={handleInputChange} />
              </FormField> */}
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
