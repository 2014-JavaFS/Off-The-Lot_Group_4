import React from 'react';
import { useCart } from './CartContext';

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className="container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="list-group">
          {cart.map((item) => (
            <li key={item.id} className="list-group-item">
              <h5>{item.make}</h5>
              <h5>{item.model}</h5>
                <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}