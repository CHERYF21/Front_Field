import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imagenes from '../assets/imagenes';
import UserFormModal from './UserForms';
import RightSidebar from './RightSidebar';
import styled, { keyframes } from 'styled-components';
import Login from './Login';

 

function Main() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <MainContainer>
      <CarouselContainer>
        <Slider {...settings}>
          <img src={imagenes.img1} alt="carousel" />
          <img src={imagenes.img2} alt="carousel" />
          <img src={imagenes.img3} alt="carousel" />
          <img src={imagenes.img4} alt="carousel" />
          <img src={imagenes.img5} alt="carousel" />
        </Slider>
      </CarouselContainer>
      <ImageContainer>
        <ZoomImage src={imagenes.imagen_gif} alt="" />
      </ImageContainer>
    <UserFormContainer>
      <UserFormModal />
      </UserFormContainer>
      <LoginContainer>
        <Login />
      </LoginContainer>
      <RightSidebarContainer>
        <RightSidebar />
      </RightSidebarContainer>

    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  background-color: #333;
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CarouselContainer = styled.div`
  width: 50%;
  height: 130px;
 
  img {
    border-radius: 15px;
  }
`;

const UserFormContainer = styled.div`
  width: 30%;
  padding: 10px;
  border-radius: 20px;
  margin-top: 40px;



`;

const RightSidebarContainer = styled.div`
 width: 100%; 
  padding: 10px;
  border-radius: 20px;
  margin-top: 370px;
  margin-left: -1000px;

`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  margin-left: 680px;
  position: absolute;
;
  
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
`;
const LoginContainer = styled.div`
  width: 30%;
  padding: 10px;
  border-radius: 20px;
  margin-top: 40px;
  margin-right: -290px;
`;