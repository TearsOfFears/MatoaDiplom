import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import './scss/app.scss';

import {Provider} from 'react-redux'
import {store, persistor} from "./redux/createStore"
import {PersistGate} from "redux-persist/integration/react"

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter >
    <PersistGate persistor={persistor}>
      <App/>
    </PersistGate>
  </BrowserRouter>
</Provider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function to
// log results (for example: reportWebVitals(console.log)) or send to an
// analytics endpoint. Learn more: https://bit.ly/CRA-vitals
