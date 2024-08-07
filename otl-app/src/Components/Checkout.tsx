import React, { useState } from 'react';

// Define the type for a cart item
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function Checkout(){
  // Initialize the cart items state with some sample data
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Initialize the shipping information state
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  // Initialize the payment information state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Function to calculate the total price of the cart items
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Function to handle changes in the shipping information inputs
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  // Function to handle changes in the payment information inputs
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    alert('Order placed successfully!');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Order Summary</h2>
      {cartItems.map(item => (
        <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price.toFixed(2)}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      <h2>Total: ${getTotalPrice()}</h2>

      <form onSubmit={handleSubmit}>
        <h2>Shipping Information</h2>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={shippingInfo.name} onChange={handleShippingChange} required />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input type="text" name="address" value={shippingInfo.address} onChange={handleShippingChange} required />
          </label>
        </div>
        <div>
          <label>
            City:
            <input type="text" name="city" value={shippingInfo.city} onChange={handleShippingChange} required />
          </label>
        </div>
        <div>
          <label>
            State:
            <input type="text" name="state" value={shippingInfo.state} onChange={handleShippingChange} required />
          </label>
        </div>
        <div>
          <label>
            ZIP Code:
            <input type="text" name="zip" value={shippingInfo.zip} onChange={handleShippingChange} required />
          </label>
        </div>

        <h2>Payment Information</h2>
        <div>
          <label>
            Card Number:
            <input type="text" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} required />
          </label>
        </div>
        <div>
          <label>
            Expiry Date:
            <input type="text" name="expiryDate" value={paymentInfo.expiryDate} onChange={handlePaymentChange} required />
          </label>
        </div>
        <div>
          <label>
            CVV:
            <input type="text" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} required />
          </label>
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};
