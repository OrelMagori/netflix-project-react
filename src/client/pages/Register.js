import React, { useState, useEffect } from "react";
import "./Register.css";
import ages from ".././database/ages.json";
import { useApiContext } from "../hooks/useApiContext";

export const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const { apiCall } = useApiContext();

  const [, setEmail_validation] = useState(true);
  const [, setPassword_validation] = useState(true);
  const [, setName_validation] = useState(true);

  useEffect(() => {
    setAge(ages);
  }, []);

  const firstNameChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setName_validation(true);
    }
    setFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setName_validation(true);
    }
    setLastName(event.target.value);
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

  const signup = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await apiCall("users/signup", "POST", {
        email,
        password,
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
    <div>
      <h2>Register</h2>
      <form onSubmit={(e) => signup(e)}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={firstNameChangeHandler}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={lastNameChangeHandler}
        />
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
        <select
          className="select-wrapper"
          placeholder="Select Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        >
          <option value disabled={true}></option>
          {ages.agesData.map((result) => (
            <option key={result.key} value={result.key}>
              {result.value}
            </option>
          ))}
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
