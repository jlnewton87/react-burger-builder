import axios from 'axios';

export default axios.create({
  baseURL: `https://burgerbuilder-92e93.firebaseio.com/`
});