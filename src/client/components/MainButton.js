import React from "react";
import "./MainButton.css";

export const MainButton = () => {

  const handleMainButton = () => {
    window.location.href = "/main";
  };

  return (
    <div>
      <span className="netflix-text" onClick={handleMainButton}>
        Netflix
      </span>
    </div>
  );
};
