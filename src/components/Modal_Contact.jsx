import React from 'react';
import styled from 'styled-components';
import imagenes from '../assets/imagenes';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Modal_Contact = ({ onClose, showModal }) => {
    if (!showModal) return null; 

    return (
        <ModalContainer>
            <ModalContent>
                <CloseButton onClick={onClose}>X</CloseButton>
                <Title>
                    <h2>Conoce Nuestro Equipo de Trabajo</h2>
                </Title>
                <CardsContainer>
                    <StyledCard>
                        <img src={imagenes.imagen_gif} alt="Productos" />
                        <div className="contact-info">
                <p><FontAwesomeIcon icon={faEnvelope} /> Correo electrónico: carlos@example.com</p>
                <p><FontAwesomeIcon icon={faPhone} /> Teléfono: +57 333 224 4587</p>
                          <div className="social-icons">
                          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                         <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  </div>
                   </div>
                        <h2>Desarrollador Backend</h2>
                      
                    </StyledCard>
                    <StyledCard>
                        <img src={imagenes.imagen_gif} alt="Ventas" />
                        <div className="contact-info">
                <p><FontAwesomeIcon icon={faEnvelope} /> Correo electrónico: carlos@example.com</p>
                <p><FontAwesomeIcon icon={faPhone} /> Teléfono: +57 333 224 4587</p>
                          <div className="social-icons">
                          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                         <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  </div>
                   </div>
                        <h2>Desarrollador Frontend</h2>
                        
                    </StyledCard>
                    <StyledCard>
                        <img src={imagenes.imagen_gif} alt="Detalle de venta" />
                        <div className="contact-info">
                <p><FontAwesomeIcon icon={faEnvelope} /> Correo electrónico: katerinebuitragoyp@gmail.com</p>
                <p><FontAwesomeIcon icon={faPhone} /> Teléfono: +57 333 224 4587</p>
                          <div className="social-icons">
                          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                         <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  </div>
                   </div>
                        <h2>Desarrollador Backend</h2>
                    </StyledCard>
                </CardsContainer>
            </ModalContent>
        </ModalContainer>
    );
};

export default Modal_Contact;

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
    background-color: rgba(0, 0, 0, 0.5); 
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: #333;
    border-radius: 10px;
    padding: 20px;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
`;

const Title = styled.h2`
    color: #fff;
    font-family: inherit;
    text-align: center;
    padding: 5px;
    text-shadow: 0 0 10px #1dd848;
`;

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

const StyledCard = styled.div`
    padding: 20px;
    width: 300px;
    height: 310px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(29, 216, 72, 0.1);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 8px 16px rgba(29, 216, 72, 0.2);
        transform: scale(1.1);
    }

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 0 10px #1dd848;
        margin-bottom: 10px;
    }

    h2 {
        text-shadow: 0 0 10px #1dd848;
        margin-bottom: 10px;
    }

    p {
        text-align: center;
    }

    .contact-info {
        font-size: 14px;
        margin-top: 10px;
    }

    .social-icons {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }

    .social-icon {
        margin: 0 5px;
        font-size: 20px;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        width: 90%;
        margin-bottom: 20px;
    }
`;