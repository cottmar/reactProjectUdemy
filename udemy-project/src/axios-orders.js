import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-63619.firebaseio.com/'
});

export default instance;