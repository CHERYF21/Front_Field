import React, { useEffect, useState } from "react";
import styled, { keyframes } from 'styled-components';
import { crearUsuario, saveUser } from "../service/userService";

function UserFormModal() {
    const [newUser, setNewUser] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        email: '',
        telefono: '',
        direccion: '',
        fechaRegistro: '',
        password: '',
        rol: 'Agricultor'
    });

    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    const handleRoleChange = (e) => {
        const { value } = e.target;
        setNewUser({
            ...newUser,
            rol: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newUser.nombre || !newUser.apellido || !newUser.edad || !newUser.email || !newUser.telefono || !newUser.direccion || !newUser.fechaRegistro || !newUser.password || !newUser.rol) {
            return;
        }
        try {
            await crearUsuario(newUser);
            alert('Usuario Registrado');
        } catch (error) {
            console.log('Error al Registrar: ', error);
            alert(error.message);
        };
    };

    useEffect(() => {
        saveUser();
    }, []);

    return (
        <> <div class="ModalBackground" style={{ display: showModal ? 'block' : 'none' }}>
        <div class="ModalContent">
            <div class="ModalHeader">
                <button class="CloseButton" onClick={() => setShowModal(false)}>X</button>
            </div>
            <div class="ModalBody">
                <form class="FormContainer" onSubmit={handleSubmit}>
                    <h2 class="Title">Registrarme</h2>
                    <div>
                        <label for="nombre" class="Label">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={newUser.nombre}
                            onChange={handleInputChange}
                            required
                            class="Input"
                        />
                    </div>
                    <div class="">
                        <label for="apellido" class="Label">Apellido:</label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={newUser.apellido}
                            onChange={handleInputChange}
                            required
                            class="Input"
                        />
                    </div>
                    <div>
                        <label for="email" class="Label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleInputChange}
                            required
                            class="Input"
                        />
                    </div>
                    <div>
                        <label for="telefono" class="Label">Telefono:</label>
                        <input
                            type="telefono"
                            id="telefono"
                            name="telefono"
                            value={newUser.telefono}
                            onChange={handleInputChange}
                            required
                            class="Input"
                        />
                    </div>
                    <div>
                        <label for="direccion" class="Label">Direccion:</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={newUser.direccion}
                            onChange={handleInputChange}
                            required
                            class="Input"
                        />
                    </div>
                    <div>
                        <label for="password" class="Label">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleInputChange}
                            required
                            class="Input"
                        />
                    </div>
                    <div>
                        <label for="role" class="Label">Rol:</label>
                        <select id="role" name="role" value={newUser.rol} onChange={handleRoleChange} class="Select">
                            <option value="Agricultor">Agricultor</option>
                            <option value="Comprador">Comprador</option>
                        </select>
                    </div>
                    <button type="submit" class="Button">Registrarme</button>
                </form>
            </div>
        </div>
    </div>
    <button onClick={() => setShowModal(true)} class="OpenModalButton">¡Quiero registrarme YA!</button>
</>
);
}

 
export default UserFormModal;



// const ModalBackground = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: ${({ show }) => (show ? 'block' : 'none')};
 
// `;
// const ModalContent = styled.div`
// background-color: white;
//   position: fixed;
//   left: 45%; 
//   transform: translate(-40%, -50%); 
//   padding: 20px;
//   border-radius: 8px;
//   max-height: 60%; 
//   top: 220px;
//  overflow: auto;

// `;

// const ModalHeader = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `;

// const ModalBody = styled.div`
//   margin-top: 5px;
// `;

// const CloseButton = styled.button`
//   background-color: #006400; 
//   color: white;
//   border: none;
//   padding: 8px 12px;
//   border-radius: 4px;
//   cursor: pointer;
// `;
// const zoomAnimation = keyframes`
//   0% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.1);
//   }
//   100% {
//     transform: scale(1);
//   }
// `;


// const OpenModalButton = styled.button`
//   background-color: #006400; 
//   color: white;
//   border: none;
//   padding: 8px 12px;
//   border-radius: 4px;
//   cursor: pointer;
//   margin-top: 250px;
//   margin-left: 90px;
//   box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
//   animation: ${zoomAnimation} 2s infinite alternate;


// `;

// const FormContainer = styled.form`
//   background-color: #f0f8f0; 
//   padding: 20px;
//   border-radius: 8px;
//   max-width: 300px;
//   margin: 0 auto;
  

// `;

// const Title = styled.h2`
//   color: #006400; 
//   text-align: center;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   color: #006400; 
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #006400; 
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.3s;
  
//   &:hover {
//     background-color: #004d00; 
//   }
// `;