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

  useEffect(() => {
    setAge(ages);
  }, []);

  const validateForm = () => {
    // Define regular expressions for validation
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    // Validation for firstName
    if (firstName.trim() === "" || !nameRegex.test(firstName)) {
      isValid = false;
      alert("Please enter a valid first name");
      // Handle invalid firstName input
    }

    // Validation for lastName
    if (lastName.trim() === "" || !nameRegex.test(lastName)) {
      isValid = false;
      alert("Please enter a valid last name");
      // Handle invalid lastName input
    }

    // Validation for email
    if (email.trim() === "" || !emailRegex.test(email)) {
      isValid = false;
      alert("Please enter a valid email");
      // Handle invalid email input
    }

    // Validation for password
    if (password.trim() === "" || password.length < 6) {
      isValid = false;
      alert("Please enter a valid password");
      // Handle invalid password input
    }

    // Validation for age
    if (age === "" || age < 18) {
      isValid = false;
      alert("Please select an age");
      // Handle invalid age input
    }
    return isValid;
  };

  const signup = async (event) => {
    event.preventDefault();

    if (validateForm()) {
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
        const returnLoginScreen = () => props.onFormSwitch("login");
        returnLoginScreen();
      } catch (error) {
        console.log(error);
      }
    } else {
      // Handle form validation errors
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
        <button type="submit">Register</button>
        <button type="button" onClick={() => props.onFormSwitch("login")}>
          Login
        </button>
      </form>
    </div>
  );
};
