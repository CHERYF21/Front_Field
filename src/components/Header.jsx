import React, { useState } from 'react';
import { ventaMercado } from '../service/mercadopago';
import styled from 'styled-components';


export const Header = ({ cart, onClose, handleEmptyCart }) => {
    
    const [producto, setProducto]= useState([]);

    const processPayment = async () => {
        try {
          if (cart.length > 0) {
                const itemsToPay = cart.map((item) => ({
                    id_product: item.id_product,
                    title: item.title,
                    quantity: item.quantity,
                    price: item.price
                }));
            const response = await ventaMercado(itemsToPay);
            window.location.href = response.data; // Redirecciona a la página de pago de Mercado Pago
          } else {
            console.error('Error: El carrito está vacío');
          }
        } catch (error) {
          console.error('Error procesando el pago:', error);
        }
    };


    const calcularTotal = () =>{
       if(!cart || cart.length === 0){
        return 0;
       }
       let total = 0;
       cart.forEach((product) => {
        total += product.price *  product.quantity;
       });
       return total.toFixed(2);
    }

    return (
        <>
            {/* <FaShoppingCart className="icon-cart" onClick={onClose} /> */}
            {cart && cart.length > 0 && (
                <div className="cart-items">
                    <div className="container-icon">
                    <i class="fa-solid fa-cart-shopping"></i>
                     <Title>
                        Field <Span>Market</Span>
                     </Title>
                    </div>
                    {cart.map((product) => (
                        <div key={product.id_product} className="cart-item">
                            <div className="item-details">
                                <div className="imagen">
                                    <img src={`data:image/jpeg;base64,${product.img}`} alt={product.title} />
                                </div>
                                <div className="text">
                                    {/* <p>{product.id_product}</p> */}
                                    <p>{product.title}</p>
                                    <p>{product.id_category}</p>
                                    <p>Cantidad: {product.quantity}</p>
                                    <p>Precio: ${product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h3> Total: ${calcularTotal()} </h3>
                    <button onClick={handleEmptyCart}>Vaciar carrito</button>
                    <button onClick={processPayment}>Pagar</button>
                </div>
            )}
        </>
    );
};

export default Header;

const Title = styled.h2`
  color: #181717;
  font-family: inherit;
  margin-left: 20px;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-top: 0.5rem;
/
  }
`;

const Span = styled.span`
  color: #1DD848;
`;
