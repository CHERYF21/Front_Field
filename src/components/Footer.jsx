import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imagenes from '../assets/imagenes';
import UserFormModal from './UserForms';
import styled, { keyframes } from 'styled-components';
import Login from './Login';
import Footer from './Footer';

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
      <ContentContainer>
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
          <ZoomImage src={imagenes.imagen} alt="" />
        </ImageContainer>
        <ButtonsContainer>
          <Login />
          <UserFormModal />
        </ButtonsContainer>
      </ContentContainer>
      <Footer />
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  background-color: #333;
  position: relative;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CarouselContainer = styled.div`
  width: 50%;
  height: 130px;
  margin-top: 20px;
  img {
    border-radius: 15px;
  }
`;

const ImageContainer = styled.div`
  margin-top: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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