import React, { useEffect, useState } from 'react';
import amsServer from '../common/ams-server';
import { useCart, CartItem} from './CartContext';
import { Form } from 'react-bootstrap'; 


interface Car{
  id: number;
  make: string;
  model: string;
  colour: string
  year: number;
  price: number;
  image: string;
  description: string;
  condition: string;  
}

export default function Home(){
  const [cars, setCars] = React.useState<Car[]>([]);

  const { addToCart } = useCart();

  const [selectedMake, setSelectedMake] = useState<string>(''); // State for selected make

  const handleAddToCart = (car: Car) => {
    const item: CartItem = {
      id: car.id,
      make: car.make,
      model: car.model,
      price: car.price,
    };
    addToCart(item);
  };

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target instanceof HTMLSelectElement) {
      setSelectedMake(event.target.value as string);
    }
  };
  
  useEffect(() => {
    // Function to fetch cars from the backend
    const fetchCars = async () => {
      try {
        // Making a GET request to the backend to fetch car data
        const response = await amsServer.get<Car[]>('/car'); // Update the URL as needed
        setCars(response.data); // Updating the state with the fetched data
      } catch (error) {
        console.error('Error fetching cars:', error); // Handling any errors that occur during the fetch
      }
    };
    fetchCars(); // Calling the function to fetch cars when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const filteredCars = selectedMake ? cars.filter(car => car.make === selectedMake) : cars;
 
  // Get unique makes for the dropdown
  const uniqueMakes = Array.from(new Set(cars.map(car => car.make)));

  return (
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 align-items-center my-5">
        <div className="col-lg-7">
          <img
            className="img-fluid rounded mb-4 mb-lg-0"
            src="https://as2.ftcdn.net/v2/jpg/03/48/32/35/1000_F_348323502_q6JQVlfFnzweB89wrsdDTgmZcNMcvDKc.jpg"
            alt="..."
          />
        </div>
        <div className="col-lg-5">
          <h1 className="font-weight-light">OFF The Lot</h1>
          <p>This is a Online car lot where you can buy and sell your used cars!!</p>
          <a className="btn btn-primary" href="/Registration">Register Now!</a>
        </div>
      </div>

      <div className="card text-white bg-secondary my-5 py-4 text-center">
        <div className="card-body">
          <p className="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p>
        </div>
      </div>

            {/* Dropdown to filter by make */}
      <div className="row mb-4">
        <div className="col-lg-12">
          <Form>
            <Form.Group controlId="selectMake">
              <Form.Label>Filter by Make</Form.Label>
              <Form.Control  as="select" value={selectedMake} onChange={(e) => handleMakeChange(e as unknown as React.ChangeEvent<HTMLSelectElement>)}>
            <option value="">All Makes</option>
                {uniqueMakes.map(make => (
              <option key={make} value={make}>{make}</option>
                ))}
            </Form.Control>
        </Form.Group>
          </Form>
      </div>
    </div>


      <div className="row gx-4 gx-lg-5">
        {cars.map(car => (
          <div className="col-md-4 mb-5" key={car.id}>
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">{car.make}{car.model}</h2>
                <p className="card-text">{car.description}{car.condition}</p>
              </div>
              <div className="card-footer">
              <button className="btn btn-primary btn-sm" onClick={() => handleAddToCart(car)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
