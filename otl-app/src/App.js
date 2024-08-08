import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Registration from './Components/Registration';
import Login from './Components/Login';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
//import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from './Components/CartContext';
import DarkMode from './Components/DarkMode';



const App = () => {
  return(
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">OTL</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="navbar-item">
                <Link to="/registration" className="nav-link">Register</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/cart" className="nav-link">Cart</Link>
              </li>
              <li className="navbar-item">
                <Link to="/checkout" className="nav-link">Checkout</Link>
              </li>
            </ul>
          </div>
        </nav>
        <DarkMode />
        <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
        </CartProvider>
      </div>
  </Router>
  )
}



export default App;
