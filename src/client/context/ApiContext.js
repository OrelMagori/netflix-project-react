import { createContext } from "react";
import toast, { Toaster } from "react-hot-toast";

export const ApiContext = createContext();
export const ApiContextProvider = ({ children }) => {
  const BASE_URL = `http://localhost:4000/api/`;
  const apiCall = async (
    url,
    method = "GET",
    body,
    contentType = "application/json"
  ) => {
    const customURL = BASE_URL + url;
    const result = await fetch(customURL, {
      headers: {
        "Content-Type": contentType,
      },
      method: method,
      body: JSON.stringify(body),
    });
    const json = await result.json();
    console.log(json);

    if (!result.ok) {
      if (result.status === 401) {
        // eslint-disable-next-line no-throw-literal
        throw "you_are_not_authorized";
      }
      // window.alert(json?.error);
      toast.error(json?.error);

      // eslint-disable-next-line no-throw-literal
      throw {
        status: result.status,
        ...json,
      };
    }
    return { status: result?.status, data: json };
  };

  return (
    <>
      <ApiContext.Provider value={{ apiCall }}>{children}</ApiContext.Provider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
};
