import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { crearUsuario, saveUser } from "../service/userService";



function UserForm() {
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
    

    const [rolOption, setRolOption] = useState('Agricultor');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });

        console.log(newUser);
    };

    const handleRoleChange = (e) => {
        const { value } = e.target;
        setRolOption(value);
        setNewUser({
            rol: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newUser.nombre || !newUser.apellido || !newUser.edad || !newUser.email || !newUser.telefono || !newUser.direccion || !newUser.fechaRegistro || !newUser.password || !newUser.rol) {
            return;
        }
        try {
            console.log(newUser)
            await crearUsuario(newUser);
            alert('Usuaraio Registrado');
        } catch (error) {
            console.log('Error al Registrar: ', error);
            alert(error.message);
        };
    };
    useEffect(() => {
        saveUser();
    })
    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Registrar</Title>
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
                <Label htmlFor="edad">Edad:</Label>
                <Input
                    type="number"
                    id="edad"
                    name="edad"
                    value={newUser.edad}
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
                <Label htmlFor="fechaRegistro">Fecha de Registro:</Label>
                <Input
                    type="date"
                    id="fechaRegistro"
                    name="fechaRegistro"
                    value={newUser.fechaRegistro}
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
    );
}

export default UserForm;

const FormContainer = styled.form`
  width: 80%; 
  margin: 90px auto; 
  position: absolute;
  top: 30px; 
  left: 0%; 
  transform: translate(-50%, -50%); 
  background-color: rgba(129, 124, 124, 0.8); 
  padding: 15px; 
  border-radius: 10px; 
`;

const FormGroup = styled.div`
  margin-bottom: rem;
`;

const Label = styled.label`
  font-family: Arial, sans-serif; 
  font-size: 1rem;
  color: #333;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 75%;
  padding: 0.5rem;
  border: 1px solid #ccc; 
  border-radius: 5px; 
  font-family: Arial, sans-serif; 
`;

const Select = styled.select`
  width: 50%;
  padding: 0.5rem;
  border: 2px solid #ccc; 
  border-radius: 5px; 
  font-family: Arial, sans-serif; 
  font-size: 1rem;
`;

const Title = styled.h1`
  font-family: Arial, sans-serif; 
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #2E8B57;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  transition: background-color 0.3s;
  padding: 10px;
  

  
  &:hover {
    background-color: #555; 
  }
`;