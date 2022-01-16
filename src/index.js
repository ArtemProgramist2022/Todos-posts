import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainApp from './App';
import store from './redux/redux';


ReactDOM.render(
  <BrowserRouter>
    <MainApp state={store.getState()}/>
  </BrowserRouter>,
  document.getElementById('root')
);