// En DeleteProduct.jsx
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DeleteProduct = ({ id_product, onDelete }) => {
    const handleDelete = async () => {
        try {
            if (id_product !== undefined && id_product !== null) {
                window.location.reload();
                // Lógica para eliminar un producto en el backend
                await axios.delete(`http://localhost:8080/user/${id_product}/delete`);
                console.log('Producto eliminado con ID:', id_product); // Nuevo log
                onDelete(id_product); // Notifica al componente padre que se ha eliminado el producto
            } else {
                console.error('El id_product es undefined o null');
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    return (
        <DeleteButton onClick={handleDelete}>Eliminar</DeleteButton>
    );
};

const DeleteButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #cc0000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px; /* Margen superior para separar del botón "Agregar" */
    transition: background-color 0.3s;

    &:hover {
        background-color: #cc0000; /* Rojo más oscuro al pasar el mouse */
    }
`;

export default DeleteProduct;
