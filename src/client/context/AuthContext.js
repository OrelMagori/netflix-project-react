import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "SIGNUP":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "SET_USER_DONE":
      return { ...state, isUserSet: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isUserSet: null,
  });

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      try {
        const user = JSON.parse(userJSON);
        dispatch({ type: "LOGIN", payload: user });
        dispatch({ type: "SET_USER_DONE" });
      } catch (error) {
        // Handle JSON parsing error here, if needed.
        console.error("Error parsing user data:", error);
        dispatch({ type: "SET_USER_DONE" });
      }
    } else {
      dispatch({ type: "SET_USER_DONE" });
    }
  }, []);

  if (!state.isUserSet) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
