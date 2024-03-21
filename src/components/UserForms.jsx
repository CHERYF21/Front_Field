import React, { useState } from "react";
import styled from "styled-components";
import { crearUsuario } from "../service/userService";
import Cookies from "js-cookie";
import { useAuth } from "../Context/AuthContext";

function UserFormModal() {
  const { setIsAuthen, setUser } = useAuth();
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    username: "",
    telefono: "",
    direccion: "",
    password: "",
    rol: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setNewUser({
      ...newUser,
      rol: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await crearUsuario(newUser);
      Cookies.set("token", res.data?.token);
      setIsAuthen(true);
      setUser(res.data?.usuario);
      setAlertMessage("Usuario registrado con éxito");
      setAlertType("success");
      setShowModal(false);
    } catch (error) {
      console.log("Error al Registrar: ", error);
      setAlertMessage(error.message);
      setAlertType("error");
    }
  };

    return (
        <>
            <ModalBackground style={{ display: showModal ? 'block' : 'none' }}>
                <ModalContent>
                    <div class="ModalHeader">
                        <CloseButton onClick={() => setShowModal(false)}>X</CloseButton>
                    </div>
                    <div class="ModalBody">
                        <FormContainer onSubmit={handleSubmit}>
                            <Title>Registrarme</Title>
                            <FormGroup>
                                <Label for="nombre">Nombre:</Label>
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
                                <Label for="apellido">Apellido:</Label>
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
                                <Label for="email">Email:</Label>
                                <Input
                                    type="email"
                                    id="username"
                                    name="username"
                                    value={newUser.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="telefono">Telefono:</Label>
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
                                <Label for="direccion">Direccion:</Label>
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
                                <Label for="password">Contraseña:</Label>
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
                                <Label for="role">Rol:</Label>
                                <Select id="role" name="role" onChange={handleRoleChange}>
                                    <option value="rol">Seleccione un rol</option>
                                    <option value="Agricultor">Agricultor</option>
                                    <option value="Comprador">Comprador</option>
                                </Select>
                            </FormGroup>
                            <Button type="submit">Registrarme</Button>
                        </FormContainer>
                    </div>
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
  display: ${({ show }) => (show ? "block" : "none")};
`;
const ModalContent = styled.div`
  background-color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 8px;
  max-height: 90%;
  height: auto;
  width: 60%;
  max-width: 400px;
  overflow-y: auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
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
  margin-top: 250px;
  margin-left: 90px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
`;

const FormContainer = styled.form`
  background-color: #f0f8f0;
  padding: 20px;
  border-radius: 8px;
  max-width: 100%;
  margin: 0 auto;
  max-height: calc(100% - 40px); /* Resta el espacio para el padding y el botón de cerrar */
  overflow-y: auto; /* Añade scroll si el contenido excede la altura máxima */
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

const AlertMessage = styled.div`
  background-color: ${({ type }) => (type === "success" ? "#4caf50" : "#f44336")};
  color: white;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
`;
