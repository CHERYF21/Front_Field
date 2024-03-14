import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imagenes from '../assets/imagenes';
import { 
    faPhone, 
    faEnvelope, 
    faLocationDot, 
    faUser, 
    faPenToSquare 
} from '@fortawesome/free-solid-svg-icons';
import { 
    faFacebookF, 
    faInstagram, 
    faTwitter, 
    faLinkedin 
} from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'; 
import Modal_Contact from './Modal_Contact';

const Contact = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <Container>
            <BoxInfo>
                <Title>
                    <h2>CONTÁCTATE CON <Span>NOSOTROS</Span></h2>
                </Title>
                <Data>
                    <p><FontAwesomeIcon icon={faPhone} /> +57 333 224 4587</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> FieldMarket@gmail.com</p>
                    <p><FontAwesomeIcon icon={faLocationDot} /> 30 Grant Ave San Francisco CA 94108-5834</p>
                </Data>
                <Links>
                    <a href="https://www.facebook.com/" target="_blank">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://twitter.com/" target="_blank">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </Links>
            </BoxInfo>
            <form>
                <InputBox>
                    <input type='text' placeholder='Nombre y apellido' required />
                    <FontAwesomeIcon icon={faUser} />
                </InputBox>
                <InputBox>
                    <input type='email' required placeholder='Correo electrónico' />
                    <FontAwesomeIcon icon={faEnvelope} />
                </InputBox>
                <InputBox>
                    <input type='text' placeholder='Asunto' />
                    <FontAwesomeIcon icon={faPenToSquare} />
                </InputBox>
                <InputBox>
                    <textarea placeholder='Escribe tu mensaje...'></textarea>
                </InputBox>
                <Button type='submit'>Enviar mensaje</Button>
            </form>
            <ImageContainer>
                <ZoomImage src={imagenes.imagen_opinion} />
            </ImageContainer>
            <ButtonContainer>
                <ConocenosButton onClick={toggleModal}>
                    <FontAwesomeIcon icon={faInfoCircle} /> Conócenos más
                </ConocenosButton>
            </ButtonContainer>
            <Modal_Contact showModal={showModal} onClose={toggleModal} />
        </Container>
    );
};

export default Contact;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 50%);
    padding: 20px;
    gap: 10px;
    width: 70%;
    max-width: 1200px;
    max-height: 500px;
    margin: auto;
    margin-top: 30px;
    background-image: url(${imagenes.imagen_fondo});
    background-size: cover;
    background-position: center;
    position: relative;
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.7);

    @media screen and (max-width: 600px) {
        grid-template-columns: 100%;
      
        padding: 5px; /* Ajustar el relleno para dispositivos pequeños */
    }
`;

const Title = styled.h2`
    color: #fff;
    font-family: inherit;
`;

const Span = styled.span`
    color: #1fc271;
`;

const BoxInfo = styled.div`
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 50px;

    > h1 {
        text-align: left;
        letter-spacing: 5px;
        font-size: 2rem; 
    }

    @media screen and (max-width: 600px) {
        gap: 15px;
        
        > h1 {
            font-size: 1.5rem; 
        }
    }
`;

const Data = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;

    > p > i {
        color: #006400; 
        margin-right: 10px;
        font-size: 25px;
    }
`;

const Links = styled.div`
    display: flex;
    gap: 15px;

    > a {
        text-decoration: none;
        width: 40px;
        height: 40px;
        background: #389c48;
        text-align:center;
        display: flex;
        justify-content: center;
        align-items: center; 
        transition: 0.1s;
    }

    > a:hover {
        background: rgb(17, 112, 49);
    }

    > a > svg { 
        color: #fff;
        font-size: 20px; 
    }
`;

const InputBox = styled.div`
    position: relative;
    margin-bottom: 20px; 

    > input,
    > textarea {
        width: calc(100% - 40px); 
        height: 40px;
        padding: 0 10px;
        outline: none;
        background: rgba(255, 255, 255, 0.1);
        border: 3px solid transparent;
        letter-spacing: 1px;
        transition: 0.3s;
        color: #fff;
    }

    > input::placeholder,
    > textarea::placeholder {
        color: #a3a3a3;
    }

    > input:focus::placeholder,
    > textarea:focus::placeholder {
        color: transparent;
    }

    > input:focus,
    > textarea:focus {
        border-bottom: 3px solid crimson;
        animation: shake 0.2s;
    }

    > svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px; 
        color: rgba(255, 255, 255, 0.3);
        transition: 0.3s;
    }

    > input:focus ~ svg,
    > textarea:focus ~ svg {
        color: #006400; ;
    }
`;


const Button = styled.button`
    width: 70%;
    margin-left: 50px;
    border-radius: 5px;
    padding: 10px;
    outline: none;
    background: #006400; ;
    color: #fff;
    border: none;
    transition: 0.1s;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background: #45e645; 
    }
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 340px;
    margin-top: -50px;
    margin-left: 200px;

    @media screen and (max-width: 600px) {
        margin-left: auto; 
        margin-right: auto;
        margin-top: 20px;
        width: 80%; 
    }

    @media screen and (min-width: 1200px) {
        margin-left: 400px; 
    }
`;

const zoomIn = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1.2);
  }
`;

const ZoomImage = styled.img`
    animation: ${zoomIn} 0.5s ease-in-out;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const ConocenosButton = styled.button`
display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    color: #45e645;
    background-color: transparent; 
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.3s ease; 

    &:hover {
        color: #389c48 
    }

    > svg {
        margin-right: 5px;
    }
`;
