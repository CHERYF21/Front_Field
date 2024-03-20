import React, { useState } from 'react';
import { ventaMercado } from '../service/mercadopago';
import { FaShoppingCart } from 'react-icons/fa'; // Importar el icono de carrito

export const Header = ({ cart, onClose, handleEmptyCart }) => {
    
    const [producto, setProducto]= useState([]);

    const processPayment = async () => {
        try {
          if (cart.length > 0) {
            const response = await ventaMercado(cart[0]);
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
        <div className="container-icon">
            <FaShoppingCart className="icon-cart" onClick={onClose} />
            {cart && cart.length > 0 && (
                <div className="cart-items">
                    <button onClick={handleEmptyCart}>Vaciar carrito</button>
                    {cart.map((product) => (
                        <div key={product.id_product} className="cart-item">
                            <div className="item-details">
                                <p>{product.id_product}</p>
                                <p>{product.title}</p>
                                <p>{product.id_category}</p>
                                <p>Cantidad: {product.quantity}</p>
                                <p>Precio: ${product.price}</p> 
                            </div>
                        </div>
                    ))}
                    <div> Total: ${calcularTotal()} </div>
                    <button onClick={processPayment}>Pagar</button>
                </div>
            )}
        </div>
    );
};

export default Header;
