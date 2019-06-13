import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
// DeleteTransfer from './components/deleteTransfer';
import VerifyAccount from './components/verifyAccount';
import ListTransferRecipients from './components/listTransferRecipients';
import TransferPage from './components/transferPage';
import BulkTransferPage from './components/bulkTransferPage';
import './App.css';

const axiosInstance = axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 5000,
  headers: {
    Authorization: "Bearer sk_test_cf0616be6156226583bf8ad620f490ae5fa27e5d"
    //  'Content-Type': 'application/json'
  }
});


function App() {
  return (
    <div className="App">
     {/*<DeleteTransfer axiosInstance = {axiosInstance}/>*/}
     <VerifyAccount axiosInstance = {axiosInstance}/>
     <ListTransferRecipients axiosInstance = {axiosInstance}/>
     <TransferPage axiosInstance = {axiosInstance}/>
     <BulkTransferPage axiosInstance = {axiosInstance} />
    </div>
  );
}

export default App;
