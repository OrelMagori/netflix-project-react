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
    <div>
      <h1>Unlimited movies, TV shows, and more</h1>
      <h3>Watch anywhere. Cancel anytime.</h3>
      <h5>
        Ready to watch? Enter your email to create or restart your membership.
      </h5>
      <form onSubmit={(e) => login(e)}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={emailChangeHandler}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={passwordChangeHandler}
        />
        <button type="submit">Login</button>
        <button type="button" onClick={() => props.onFormSwitch("register")}>
          Register
        </button>
      </form>
    </div>
  );
};
