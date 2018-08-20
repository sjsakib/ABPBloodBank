import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './App';

const store = createStore(rootReducer);

export default props => (
  <Provider store={store}>
    <App />
  </Provider>
);
