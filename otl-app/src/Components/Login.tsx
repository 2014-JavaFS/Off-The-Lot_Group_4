import { useState, useRef } from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


export default function Login() {
    // Use state to track the status of the login request
    const [status, setStatus] = useState<number | string | undefined>(0);
    
    // Refs for the username and password inputs
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    // Function to handle login
    async function login() {
        // Extract values from input fields
        const username = usernameInput.current?.value;
        const password = passwordInput.current?.value;

        console.log(username);
        console.log(password);

        try {
            // Send POST request with username and password
            const response = await axios.post('http://localhost:8080/users/login?username=user11&password=pass', { username, password });

            // Check response status and headers
            if (response.status >= 200 && response.status < 300) {
                // Handle successful login
                setStatus("Successfully logged in");
            } else if (response.status >= 300 && response.status < 401) {
                // Handle redirection if needed
                setStatus(12345);
            }
            
            console.log(response.status);
        } catch (error) {
            // Handle errors
            console.error(error);
            setStatus("Login failed due to an error");
        }
    }

    return (
        <div> 
            <form>
                <div className="form-outline mb-4">
                    <input
                        type="email"
                        id="form2Example1"
                        className="form-control"
                        placeholder="Please enter email"
                        ref={usernameInput}
                    />
                    <label className="form-label" htmlFor="form2Example1">Email address</label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        type="password"
                        id="form2Example2"
                        className="form-control"
                        placeholder="Please enter password"
                        ref={passwordInput}
                    />
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                </div>

                {/* 2 column grid layout for inline styling */}
                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        {/* Checkbox */}
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="form2Example31"
                                defaultChecked
                            />
                            <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                        </div>
                    </div>

                    <div className="col">
                        {/* Simple link */}
                        <a href="/Forgot">Forgot password?</a>
                    </div>
                </div>

                {/* Submit button */}
                <button
                    type="button"
                    className="btn btn-primary btn-block mb-4"
                    onClick={login}
                >
                    Sign in
                </button>

                {/* Register buttons */}
                <div className="text-center">
                    <p>Not a member? <a href="/Register">Register</a></p>
                    <p>or sign up with:</p>
                </div>
            </form>

            {/* Status message */}
            {status !== 0 && (
                <p>
                    {typeof status === 'string'
                        ? status
                        : "Login status code: " + status}
                </p>
            )}
        </div> 
    )
}
