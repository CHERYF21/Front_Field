import React from 'react';
import styled from 'styled-components';
import imagenes from '../assets/imagenes';
import UserForm from './UserForms';

function Main() {
  return (
    <MainContainer>
      <ImageContainer>
        <img src={imagenes.img} alt="Imagen" className="img" />
        <div className="texto">
          <UserForm />
        </div>
      </ImageContainer>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  background-color: #333;
  display: flex;
  flex-direction: row;
  height: 2000px;
`;

const ImageContainer = styled.div`
  width: 50%;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    margin-top: 100px;
  }

  .texto {
    width: 30%;
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translate(-50%, -50%);
    background-color: rgba(238, 229, 229, 0.7);
    padding: 10px;
  }
`;
