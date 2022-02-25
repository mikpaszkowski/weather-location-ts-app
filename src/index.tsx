import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/rootStore";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<App />}/>
          <Route path="/" element={<Navigate replace to="/home"/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
