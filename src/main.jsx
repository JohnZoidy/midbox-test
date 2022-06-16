// @ts-check

import React from 'react';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import store from './slices/index.js';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
