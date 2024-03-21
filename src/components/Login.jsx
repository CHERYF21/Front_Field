import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { loginUser } from "../service/userService";
import Cookies from "js-cookie";
import { useAuth } from "../Context/AuthContext";

function Login() {
  const { setIsAuthen, setUser } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 2000); // Oculta la alerta después de 2 segundos

      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await loginUser(credentials);
      Cookies.set("token", resp.data?.token);
      setIsAuthen(true);
      setUser(resp.data?.user);
      setAlertMessage("Inicio de sesión exitoso");
      setAlertType("success");
      setShowAlert(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000); // Cierra el modal después de 2 segundos
    } catch (error) {
      console.log('Error al Loguar: ', error);
      setAlertMessage(error.message);
      setAlertType("error");
      setShowAlert(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setCredentials({
      username: '',
      password: ''
    });
  };

  return (
    <>
      <ModalBackground show={showModal}>
        <ModalContent>
          <ModalHeader>
            <CloseButton onClick={handleClose}>X</CloseButton>
          </ModalHeader>
          <ModalBody>
            <FormContainer onSubmit={handleSubmit}>
              <Title>Inicio de Sesión</Title>
              {showAlert && (
                <AlertMessage type={alertType}>{alertMessage}</AlertMessage>
              )}
              <FormGroup>
                <Label htmlFor="email">Email:</Label>
                <Input
                  type="email"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Contraseña:</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <Button type="submit">Ingresar</Button>
            </FormContainer>
          </ModalBody>
        </ModalContent>
      </ModalBackground>
      <OpenModalButton onClick={() => setShowModal(true)}>Iniciar Sesión</OpenModalButton>
    </>
  );
}

export default Login;

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
  border-radius: 5px;
  cursor: pointer;
  margin-top: 250px;
  margin-left: -80px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
`;

const FormContainer = styled.form`
  background-color: #f0f8f0; 
  padding: 30px;
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
`;
