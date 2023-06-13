import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import Search from "./client/components/Search";
import { Main } from "../src/client/pages/Main";
import { Home } from "../src/client/pages/Home";
import { Login } from "../src/client/pages/Login";
import { About } from "../src/client/pages/About";
import { Register } from "./client/pages/Register";
import { Favorite } from "../src/client/pages/Favorite";
import { ApiContextProvider } from "../src/client/context/ApiContext";
import { AuthContextProvider } from "../src/client/context/AuthContext";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ApiContextProvider>
          <Routes>
            <Route index element={<App />} />
            <Route path="main" element={<Main />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="search" element={<Search />} />
            <Route path="register" element={<Register />} />
            <Route path="favorite" element={<Favorite />} />
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
