import React, { useState } from 'react';
import { ventaMercado } from '../service/mercadopago';


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
            <div className="cart-items">
                    <h2>Carrito de Compras</h2>
                    <button onClick={onClose}>Cerrar</button>
                    <button onClick={handleEmptyCart}>Vaciar carrito</button>
                {cart && cart.length > 0 ? (
                    cart.map((product) => (
                        <div key={product.id_product} className="cart-item">
                            {/* <img src={`data:image/jpeg;base64,${product.img}`} alt={product.title} /> */}
                            <div className="item-details">
                                <p>{product.id_product}</p>
                                <p>{product.title}</p>
                                <p>{product.id_category}</p>
                                <p>Cantidad: {product.quantity}</p>
                                <p>Precio: ${product.price}</p> 
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay productos en el carrito</p>
                )}
            </div>
            <div> Total: ${calcularTotal()} </div>
            <button onClick={processPayment}>Pagar</button>
        </div>
    );
};

export default Header;
