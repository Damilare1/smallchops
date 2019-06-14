import axios from 'axios';

export default axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 5000,
  headers: {
    Authorization: "Bearer sk_test_cf0616be6156226583bf8ad620f490ae5fa27e5d"
    //  'Content-Type': 'application/json'
  }
});