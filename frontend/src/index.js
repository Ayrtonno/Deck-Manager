import "./style/style.css"
// react si occupa della UI dell'app
import React from 'react';
// react DOM si occupa del render nel browser
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
//serve a fare richieste all'API (al backend)
import Axios from "axios";

import store from "./store/store";

import App from './App';

import reportWebVitals from './reportWebVitals';

// vvvv dice di mandare i cookie
Axios.defaults.withCredentials = true


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
