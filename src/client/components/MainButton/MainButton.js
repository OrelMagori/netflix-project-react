import React from "react";
import "./MainButton.css";

export const MainButton = () => {

  const handleMainButton = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <span className="netflix-text" onClick={handleMainButton}>
        netflix
      </span>
    </div>
  );
};
