import React, { useState } from 'react';
import styled from 'styled-components';
import { listUser } from '../service/userService';
import { useAuth } from '../Context/AuthContext';

const Info_Agricultor = ({ agricultor }) => {
    const {isAuthen, user} = useAuth();
    const [showModal, setShowModal] = useState(false);
    

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    

    return (
        <>
            <Button onClick={toggleModal}>Ver información del agricultor</Button>
            {showModal && (
                <ModalOverlay>
                    <ModalContainer>
                        <ModalContent>
                            <CloseButton onClick={toggleModal}>X</CloseButton>
                            <Title>
                                <h2>Información de Agricultor</h2>
                            </Title>
                            <CardsContainer>
                                <StyledCard>
                                    <div className="contact-info">
                                        <p>Nombre: {user?.nombre} {user?.apellido}</p>
                                        <p>Teléfono: {user?.telefono}</p>
                                    </div>
                                </StyledCard>
                            </CardsContainer>
                        </ModalContent>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </>
    );
};

export default Info_Agricultor;

const Button = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    position: relative;
`;

const ModalContent = styled.div`
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: black;
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
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        transform: scale(1.1);
    }

    h2 {
        margin-bottom: 10px;
    }

    p {
        text-align: center;
    }

    .contact-info {
        font-size: 14px;
        margin-top: 10px;
    }

    @media (max-width: 768px) {
        width: 90%;
        margin-bottom: 20px;
    }
`;
