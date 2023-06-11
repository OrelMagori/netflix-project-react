import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiContext } from "../hooks/useApiContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Login.css";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setEmail_validation] = useState(true);
  const [, setPassword_validation] = useState(true);
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
      <form onSubmit={(e) => login(e)}>
        <h2>Login</h2>

        <div className="form-group">
          <label>Email address</label>
          <input
            value={email}
            onChange={emailChangeHandler}
            type="email"
            placeholder="example@gmail.com"
            id="email"
            name="email"
            aria-label="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            onChange={passwordChangeHandler}
            type="password"
            placeholder="*********"
            id="password"
            name="password"
            aria-label="email"
          />
          <small>We'll never share your password with anyone else.</small>
          <br />
          <br />
        </div>
        <button type="submit">
          Log In
        </button>
        <br />
        <br />
        <button
          type="button"
          onClick={() => props.onFormSwitch("register")}
        >
          Don't have an account? Register here
        </button>
      </form>
    </div>
  );
};
