import React from 'react';
import styled from 'styled-components';

function BurguerButton(props) {
  
  return (
    <Burguer onClick={props.handleClick}>
      <div className={`icon nav-icon-5 ${props.clicked ? 'open' : ''}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </Burguer>
  );
}

export default BurguerButton;

const Burguer = styled.div`

  .nav-icon-5 {
    width: 35px;
    height: 30px;
    margin: 10px 10px;
    position: relative;
    cursor: pointer;
    display: inline-block;
  }
  .nav-icon-5 span {
    background-color: #fff;
    position: absolute;
    border-radius: 2px;
    width: 100%;
    height: 4px;
    transition: transform 0.3s ease; /* Solo la transición de transform */
  }
  .nav-icon-5 span:nth-child(1) {
    top: 0px;
    left: 0px;
  }
  .nav-icon-5 span:nth-child(2) {
    top: 13px;
    left: 0px;
    opacity: 1;
  }
  .nav-icon-5 span:nth-child(3) {
    bottom: 0px;
    left: 0px;
  }
  .nav-icon-5.open span:nth-child(1) {
    transform: ${({ clicked }) => clicked ? 'rotate(45deg)' : 'none'}; /* Aplica la transformación solo cuando clicked es true */
    top: 13px;
  }
  .nav-icon-5.open span:nth-child(2) {
    opacity: 0;
  }
  .nav-icon-5.open span:nth-child(3) {
    transform: ${({ clicked }) => clicked ? 'rotate(-45deg)' : 'none'}; /* Aplica la transformación solo cuando clicked es true */
    top: 13px;
  }
`;
