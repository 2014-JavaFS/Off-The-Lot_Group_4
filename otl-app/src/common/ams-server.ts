import axios from 'axios';

const amsServer = axios.create({
    baseURL: "http://localhost:8080",
   
});

export default amsServer;