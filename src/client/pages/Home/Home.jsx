import React from "react";

import "./Home.css";
import Search from "../../components/Search/Search";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navigator from "../../components/Navigator/Navigator";

export const Home = () => {
  const { user } = useAuthContext();
  return (
    <div>
      {user ? (
        <div>
          <Navigator />
          <Search />
        </div>
      ):(
        <div>
          <h1 className="h1">Please login again</h1>
        </div>
  )}
    </div>
  );
};
