// import axios from 'axios';
// import React, { useRef } from 'react';
// import { Form, Button } from 'react-bootstrap';


// export default function Login() {
//     let username;
//     let password;
//     const [status, setStatus] = useState('');


//     async function login() {
//         const usernameInput = useRef<HTMLInputElement | undefined>();
//         const passwordInput = useRef<HTMLInputElement | undefined>();
    
//         console.log(usernameInput.current?.value);
//         console.log(passwordInput.current?.value);

//         try {
//             const response = await amsServer.post('/users/login', {username, password});
//             console.log(response.data);
//             // Handle successful login
//         } catch (error) {
//             console.error(error);
//             // Handle login error
//         }
//     }
//     return(<React.Fragment>
//         <Form>
//             <Form.Group controlId="formBasicEmail">
//                 <Form.Label>Username</Form.Label>
//                 <Form.Control type="text" placeholder="Enter username" ref={usernameInput} />
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" placeholder="Password" ref={passwordInput} />
//             </Form.Group>
//             <Button variant="primary" type="submit" onClick={login}>
//                 Submit
//             </Button>
//         </Form>

//         {status undefined ? null :}{}
//                 <p>{status >= 400 ?
//                 "Login failed due to invalid credentials" : 
//                 "Successfully loged in"}</p>
//         };
//         </React.Fragment>);
// }