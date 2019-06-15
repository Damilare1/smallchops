import axios from 'axios';

export default axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 5000,
  headers: {
    Authorization: process.env.REACT_APP_AUTH_KEY
  }
});