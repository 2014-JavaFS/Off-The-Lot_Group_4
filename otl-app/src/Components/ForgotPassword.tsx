import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Send a POST request to the server with the email
            const response = await axios.post('/api/forgot-password', { email });
            console.log(response.data); // Handle the response as needed

            // Display a success message to the user
            alert('Password reset email sent!');
        } catch (error) {
            // Display an error message to the user
            alert('Failed to send password reset email.');
        }
    };

    return (
        <div className="container">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;