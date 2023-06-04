import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiContext } from "../hooks/useApiContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Login.css";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email_validation, setEmail_validation] = useState(true);
  const [password_validation, setPassword_validation] = useState(true);
  const { apiCall } = useApiContext();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setEmail_validation(true);
    }
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setPassword_validation(true);
    }
    setPassword(event.target.value);
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await apiCall("users/login", "POST", {
        email,
        password,
      });
      console.log(status);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({ type: "LOGIN", payload: data.user });
      navigate("/home");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginPageDiv">
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form className="border p-3 rounded" onSubmit={(e) => login(e)}>
          <h2 className="m-2">Login</h2>

          <div className="form-group" style={{ textAlign: "left" }}>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              value={email}
              onChange={emailChangeHandler}
              type="email"
              placeholder="example@gmail.com"
              id="email"
              name="email"
              className="form-control"
              aria-label="email"
              aria-describedby="basic-addon1"
            />
          </div>
          <br />
          <div className="form-group" style={{ textAlign: "left" }}>
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              value={password}
              onChange={passwordChangeHandler}
              type="password"
              placeholder="*********"
              id="password"
              name="password"
              className="form-control"
              aria-label="email"
              aria-describedby="basic-addon1"
            />
            <small>We'll never share your password with anyone else.</small>
            <br />
            <br />
          </div>
          <button type="submit" className="btn btn-outline-dark">
            Log In
          </button>
          <br />
          <br />
          <button
            className="btn btn-outline-light"
            onClick={() => props.onFormSwitch("register")}
          >
            Don't have an account? Register here
          </button>
        </form>
      </div>
    </div>
  );
};
