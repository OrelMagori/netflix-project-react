import React from "react";

import "./Main.css";
import { MainButton } from "../../components/MainButton/MainButton";

export const Main = (props) => {
  const handleLoginButton = () => {
    window.location.href = "/login";
  };

  const handleRegisterButton = () => {
    window.location.href = "/register";
  };

  return (
    <div>
      <MainButton />
      <div className="mainContainer">
        <p className="largeSpan">Unlimited movies, TV shows, and more</p>
        <p className="mediumSpan">Watch anywhere. Cancel anytime.</p>
        <p className="smallSpan">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <button
          className="mainButton"
          type="button"
          onClick={handleRegisterButton}
          style={{ marginRight: 10 }}
        >
          Register
        </button>
        <button
          className="mainButton"
          type="button"
          onClick={handleLoginButton}
          style={{ marginLeft: 10 }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
