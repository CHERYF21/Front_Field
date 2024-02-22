import React from 'react';
import styled from 'styled-components';
import imagenes from '../assets/imagenes';
import UserForm from './UserForms';

function Main() {
  return (
    <MainContainer>
      <ImageContainer>
        <img src={imagenes.img} alt="Imagen" className="img" />
      </ImageContainer>
      <UserFormContainer>
        <UserForm />
      </UserFormContainer>
      
      <section>
      <img src={imagenes.img1} alt="carrousel" />
      <img src={imagenes.img2} alt="carrousel" />
      <img src={imagenes.img3} alt="carrousel" />
      <img src={imagenes.img4} alt="carrousel" />
      <img src={imagenes.img5} alt="carrousel" />
    </section>
    
   

  
    </MainContainer>
  
  
  );
}

export default Main;

const MainContainer = styled.div`
  background-color: #333;
  display: flex;
  flex-direction: row;
  height: 2000px;
  section{
  display: flex;
  width: 600px;
  height: 430px;
}
section img{
  width: 0px;
  flex-grow: 1;
  object-fit: cover;
  opacity: .8;
  transition: .5s ease;
}
section img:hover{
  cursor: crosshair;
  width: 300px;
  opacity: 1;
  filter: contrast(120%);
}




`;

const ImageContainer = styled.div`
  width: 60%;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
 
`;

const UserFormContainer = styled.div`
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(238, 229, 229, 0.7);
  padding: 10px;
  border-radius: 20px;
`;
