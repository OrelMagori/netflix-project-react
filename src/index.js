import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../src/client/pages/Login";
import { AuthContextProvider } from "../src/client/context/AuthContext";
import { ApiContextProvider } from "../src/client/context/ApiContext";
import { Home } from "../src/client/pages/Home";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ApiContextProvider>
          <Routes>
            <Route index element={<App />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home/>} />
          </Routes>
        </ApiContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
