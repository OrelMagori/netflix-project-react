import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Register.css";
import ages from "../database/ages.json";
import { MainButton } from "../components/MainButton";
import { useApiContext } from "../hooks/useApiContext";

export const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const { apiCall } = useApiContext();
  const navigate = useNavigate();

  useEffect(() => {
    setAge(ages);
  }, []);

  const signup = async (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, password, age);
    try {
      const { status, data } = await apiCall("users/signup", "POST", {
        firstName,
        lastName,
        email,
        password,
        age,
      });
      console.log(status);
      console.log(data);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setAge("");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <MainButton />
      <div className="container">
        <p className="largeSpan">Create an Account</p>
        <form onSubmit={(e) => signup(e)}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="">Select Age</option>
            {ages.agesData.map((result) => (
              <option key={result.key} value={result.key}>
                {result.value}
              </option>
            ))}
          </select>
          <button type="submit" className="register-btn">
            <span className="btn-icon">Get Started</span>
          </button>
        </form>
      </div>
    </div>
  );
};
