import React, { useState } from "react";
import { useApiContext } from "../hooks/useApiContext";
import "./Register.css";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const { apiCall } = useApiContext();

  const [email_validation, setEmail_validation] = useState(true);
  const [password_validation, setPassword_validation] = useState(true);
  const [name_validation, setName_validation] = useState(true);
  const [ID_validation, setID_validation] = useState(true);

  const nameChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setName_validation(true);
    }
    setName(event.target.value);
  };

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

  const idChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setID_validation(true);
    }
    setId(event.target.value);
  };

  const signup = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await apiCall("users/signup", "POST", {
        email,
        password,
        name,
        id,
      });
      console.log(status);
      console.log(data);
      const returnLoginScreen = () => props.onFormSwitch("login");
      returnLoginScreen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registerPageDiv">
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form className="border p-3 rounded" onSubmit={(e) => signup(e)}>
          <h2 className="m-2">Register</h2>
          <div className="form-group" style={{ textAlign: "left" }}>
            <label htmlFor="fullName">Full name</label>
            <input
              value={name}
              onChange={nameChangeHandler}
              name="name"
              id="name"
              placeholder="Israel Israeli"
              type="text"
              className="form-control"
              aria-label="email"
              aria-describedby="basic-addon1"
            />
          </div>
          <br />
          <div className="form-group" style={{ textAlign: "left" }}>
            <label htmlFor="exampleInputEmail">Email address</label>
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
            <label htmlFor="idField">ID</label>
            <input
              value={id}
              onChange={idChangeHandler}
              type="number"
              name="id"
              id="id"
              placeholder="Your ID"
              className="form-control"
              aria-label="email"
              aria-describedby="basic-addon1"
            />
          </div>
          <br />
          <div className="form-group" style={{ textAlign: "left" }}>
            <label htmlFor="passwordField">Password</label>
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
            Register
          </button>
          <br />
          <br />
          <button
            className="btn btn-outline-light"
            onClick={() => props.onFormSwitch("login")}
          >
            Already have an account? Login here
          </button>
        </form>
      </div>
    </div>
  );
};
