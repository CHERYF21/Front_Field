import React, { useEffect, useState } from "react";
import styled from 'styled-components';
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
        <>
            <ModalBackground show={showModal}>
                <ModalContent>
                    <ModalHeader>
                        <CloseButton onClick={() => setShowModal(false)}>X</CloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <FormContainer onSubmit={handleSubmit}>
                            <Title>Registrarme</Title>
                            <FormGroup>
                <Label htmlFor="nombre">Nombre:</Label>
                <Input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={newUser.nombre}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="apellido">Apellido:</Label>
                <Input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={newUser.apellido}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">Email:</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="telefono">Telefono:</Label>
                <Input
                    type="telefono"
                    id="telefono"
                    name="telefono"
                    value={newUser.telefono}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="direccion">Direccion:</Label>
                <Input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={newUser.direccion}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Contraseña:</Label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="role">Rol:</Label>
                <Select id="role" name="role" value={newUser.rol} onChange={handleRoleChange}>
                    <option value="Agricultor">Agricultor</option>
                    <option value="Comprador">Comprador</option>
                </Select>
            </FormGroup>
                            <Button type="submit">Registrarme</Button>
                        </FormContainer>
                    </ModalBody>
                </ModalContent>
            </ModalBackground>
            <OpenModalButton onClick={() => setShowModal(true)}>¡Quiero registrarme YA!</OpenModalButton>
        </>
    );
}

export default UserFormModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? 'block' : 'none')};
 
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

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalBody = styled.div`
  margin-top: 20px;
`;

const CloseButton = styled.button`
  background-color: #006400; 
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
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