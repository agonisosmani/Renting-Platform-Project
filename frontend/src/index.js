import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import Routes from './routes';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

