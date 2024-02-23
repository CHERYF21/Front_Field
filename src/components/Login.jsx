import React, { useState } from 'react';
import styled from 'styled-components';

const Login = () => {
  const [credentials, setCredentials] = useState({
    correo: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Credenciales:', credentials);
    setCredentials({
      correo: '',
      contraseña: ''
    });
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Inicio de Sesión</Title>
        <FormGroup>
          <Label htmlFor="correo">Correo Electrónico:</Label>
          <Input type="email" id="correo" name="correo" value={credentials.correo} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="contraseña">Contraseña:</Label>
          <Input type="password" id="contraseña" name="contraseña" value={credentials.contraseña} onChange={handleChange} required />
        </FormGroup>
        <SubmitButton type="submit">Iniciar Sesión</SubmitButton>
      </FormContainer>
    </>
  );
};

export default Login;

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

const SubmitButton = styled.button`
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
