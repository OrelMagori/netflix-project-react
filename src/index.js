import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import { Main } from "../src/client/pages/Main/Main";
import { Home } from "../src/client/pages/Home/Home";
import { Login } from "../src/client/pages/Login/Login";
import { About } from "../src/client/pages/About/About";
import { Register } from "./client/pages/Register/Register";
import { Favorite } from "../src/client/pages/Favorite/Favorite";
import { ApiContextProvider } from "../src/client/context/ApiContext";
import { AuthContextProvider } from "../src/client/context/AuthContext";

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
            <Route path="register" element={<Register />} />
            <Route path="favorite" element={<Favorite />} />
          </Routes>
        </ApiContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
