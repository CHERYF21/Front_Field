import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FaQuestionCircle } from 'react-icons/fa'
import styled, { keyframes } from 'styled-components';
import imagenes from '../assets/imagenes';
import { updateUser } from './../service/userService';
import { useAuth } from '../Context/AuthContext';


const User_Profile = () => {

  const {isAuthen, user} = useAuth();
  const [usuario, setUsuario] = useState({
    id: user?.id, 
    telefono: '',
    password: '',
    direccion: ''
  });

  const updateUsuario = async () => {
    try {
      const response = await updateUser(usuario.id, usuario);
      console.log(response);
    } catch (error) {
      console.error("Error al actualizar", error)
    }
  }
  const usuarioActualizado = {
    id: user?.id,
    telefono: usuario.telefono,
    password: usuario.password,
    direccion: usuario.direccion
  }

  return (
    <Container>
      <HelpCard>
        <HelpTitle><FaQuestionCircle /> Ayuda y Soporte</HelpTitle>
        <HelpContent>
          ¡Bienvenido! En esta vista, tienes la capacidad de modificar tus datos personales para mantener tu información actualizada y precisa.
          Para facilitar la administración de tu perfil, hemos diseñado un formulario donde puedes realizar cambios en tus datos personales, como tu dirección, número de teléfono y contraseña.
        </HelpContent>
        <ImagePerfil>
          <ZoomImage src={imagenes.perfil} alt="" />
        </ImagePerfil>
      </HelpCard>
      <FormContainer>
        <Title>Modificación de mi Perfil</Title>
        <FormGroup>
          <Label htmlFor="password"><FontAwesomeIcon icon={faLock} /> Cambiar Contraseña:</Label>
          <Input type="password" id="password" name="password" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="address"><FontAwesomeIcon icon={faMapMarkerAlt} /> Modificar Dirección:</Label>
          <Input type="text" id="address" name="direccion" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone"><FontAwesomeIcon icon={faPhone} /> Modificar Teléfono:</Label>
          <Input type="tel" id="phone" name="telefono" required />
        </FormGroup>
        <ButtonContainer>
          <UpdateButton onClick={() => updateUsuario(usuarioActualizado)}>Actualizar perfil</UpdateButton>
          <DeleteButton>Eliminar cuenta</DeleteButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default User_Profile;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  align-items: center;
  height: 40vh;

 
`;
const HelpCard = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  margin-right: 20px; 
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
`;

const HelpTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const HelpContent = styled.p`
  font-size: 16px;
`;
const ImagePerfil = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  margin-right: 5px; 
  position: absolute;
  width: 100px;

  img {
    max-width: 500%;
   
  }

  @media screen and (max-width: 768px) {
    margin: 0 auto;
    margin-bottom: 1rem;
    display: none; 
  }
`;
const zoomIn = keyframes`
  from {
    transform: scale(0.7);
  }
  to {
    transform: scale(1.2);
  }
`;

const ZoomImage = styled.img`
  animation: ${zoomIn} 0.5s ease-in-out;
  width: 500%;
`;
const FormContainer = styled.form`
  background-color: #f0f8f0; 
  flex-grow: 1;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  width: 90%;
  margin-top: 200px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  width: 48%;
  padding: 6px 10px;
  font-size: 14px;
  background-color: #ee2738; 
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #c71f2b; 
  }
`;

const UpdateButton = styled.button`
  width: 48%;
  padding: 6px 10px;
  font-size: 14px;
  background-color: #1fc271; 
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #1a995e; 
  }
`;