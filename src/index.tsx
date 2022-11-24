import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './container/App';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = 'https://restcountries.com/';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

