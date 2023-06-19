import React from "react";
import "./Home.css";
import Navigator from "../components/Navigator";
import Search from "../components/Search";
import { useAuthContext } from "../hooks/useAuthContext";

export const Home = () => {
  const { user } = useAuthContext();
  return (
    <div>
      {user ? (
        <div>
          <Navigator />
          <Search />
        </div>
      ): (
        <div>
          <Navigator />
          <h1>please login again</h1>
        </div>
  )}
    </div>
  );
};
