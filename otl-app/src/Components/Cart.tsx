import { useState, useRef } from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  interface CartProps {
    cartItems: CartItem[];
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (id: number) => void;
  }


export default function Cart() {
    // Use state to track the status of the login request
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (id: number, quantity: number) => {
        setCartItems(cartItems.map(item => 
          item.id === id ? { ...item, quantity } : item
        ));
    };
    
      const handleRemoveItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
      };
    
      const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
      };



      return (
        <div>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <div>
                    <label>
                      Quantity:
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        min="1"
                      />
                    </label>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              ))}
              <h2>Total: ${getTotalPrice()}</h2>
              <button onClick={() => alert('Proceeding to checkout...')}>Checkout</button>
            </div>
          )}
        </div>
      );
    
}

