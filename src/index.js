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
