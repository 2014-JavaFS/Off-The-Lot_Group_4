import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useStripe } from '@stripe/react-stripe-js';
import { CardElement, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';


interface CheckoutProps {
    cartItems: CartItem[];
    subtotal: number;
    total: number;
    onOrderComplete: (orderId: string) => void;
    onError: (error: string) => void;
}



const Checkout: React.FC<CheckoutProps> = ({
    cartItems,
    subtotal,
    total,
    onOrderComplete,
    onError,
  }) => {
    const { cart } = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [cardError, setCardError] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
  
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };
  
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
  
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(e.target.value);
    };
  
    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
    };
  
    const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);
    };
  
    const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setZip(e.target.value);
    };
  
    const handleCardChange = (e: React.ChangeEvent<HTMLDivElement>) => {
      setCardError(e.error ? e.error.message : '');
    };
  
    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPaymentMethod(e.target.value);
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const cardElement = elements.getElement(CardElement);
  
      if (cardElement) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name,
            email,
            address: {
              line1: address,
              city,
              state,
              postal_code: zip,
            },
          },
        });
  
        if (error) {
          setCardError(error.message);
        } else {
          // Create a new order and send it to the server
          const order = {
            items: cartItems,
            subtotal,
            total,
            paymentMethodId: paymentMethod.id,
          };
  
          try {
            const response = await axios.post('/api/orders', order);
            onOrderComplete(response.data.orderId);
          } catch (error) {
            onError(error.message);
          }
        }
      }
    };

    return (
        <>
        <div className="checkout-container">
          <h1>Checkout</h1>
          <form onSubmit={handleSubmit}>
            <div className="billing-info">
              <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange} />
              </label>
              <label>
                Address:
                <input type="text" value={address} onChange={handleAddressChange} />
              </label>
              <label>
                City:
                <input type="text" value={city} onChange={handleCityChange} />
              </label>
              <label>
                State:
                <input type="text" value={state} onChange={handleStateChange} />
              </label>
              <label>
                Zip:
                <input type="text" value={zip} onChange={handleZipChange} />
              </label>

              <div className="payment-method">
              <label>
                Payment Method:
                <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                  <option value="">Select a payment method</option>
                  <option value="card">Card</option>
                  {/* Add more payment methods as needed */}
                </select>
              </label>
              {paymentMethod === 'card' && (
                <div className="card-info">
                  <CardElement onChange={handleCardChange} />
                  {cardError && <div className="error">{cardError}</div>}
                </div>


        </>
    )
        

export default Checkout;