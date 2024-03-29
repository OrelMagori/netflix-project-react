import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Register.css";
import ages from "../../database/ages.json";
import { useApiContext } from "../../hooks/useApiContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { MainButton } from "../../components/MainButton/MainButton";

export const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const { dispatch } = useAuthContext();

  const { apiCall } = useApiContext();
  const navigate = useNavigate();

  useEffect(() => {
    setAge(ages);
  }, []);

  const handleLoginButton = () => {
    window.location.href = "/login";
  };

  const signup = async (event) => {
    event.preventDefault();
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
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({ type: "LOGIN", payload: data.user });
      navigate("/login");
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
          <button className="mainButton" type="submit">
            <span className="btn-icon">Get Started</span>
          </button>
          <p>
            Already have an account? {" "}
            <span className="link" onClick={handleLoginButton}>
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
