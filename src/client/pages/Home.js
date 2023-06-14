import React from "react";
import "./Home.css";
import Navigator from "../components/Navigator";
import Search from "../components/Search";

export const Home = () => {
  return (
    <div>
      <Navigator />
      <Search />
    </div>
  );
};
