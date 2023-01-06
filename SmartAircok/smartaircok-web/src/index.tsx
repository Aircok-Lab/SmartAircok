import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { legacy_createStore, applyMiddleware  } from 'redux';
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './items/RootReducer';

import './index.css';

const sagaMiddleware = createSagaMiddleware();

const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
