import React from "react";
import "./App.css";
import { Main } from "../src/client/pages/Main";
// import { Login } from "../src/client/pages/Login";
// import { Register } from "../src/client/pages/Register";

function App() {
  // const [currentForm, setCurrentForm] = useState("login");

  // const toggleForm = (forName) => {
  //   setCurrentForm(forName);
  // };

  return (
    <div className="App">
      <Main />
      {/* {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )} */}
    </div>
  );
}

export default App;
