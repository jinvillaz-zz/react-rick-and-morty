import axios from 'axios';

const config = {
  baseURL: process.env.REACT_APP_BACKEND_API || 'https://rickandmortyapi.com/api',
  headers: {
    'Content-type': 'application/json'
  }
};
let instance = axios.create(config);

class CustomAxios {

  get() {
    return instance;
  }
}

const customAxios = new CustomAxios();
export default customAxios;
