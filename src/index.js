import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import App from "./components/App.jsx";

import store from "./store";


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  , document.querySelector("#root")
);
