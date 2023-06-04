import React, { useState, useEffect } from "react";
import { useApiContext } from "../hooks/useApiContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // const [inputVal, setInputVal] = React.useState({
  //   itemName: "",
  //   itemPrice: "",
  // });

  const [myList, setMyList] = useState([]);

  const { apiCall } = useApiContext();
  const { user, dispatch } = useAuthContext();

  const fetchData = async () => {
    let api = `items?userId=${user?._id}`;
    const { data } = await apiCall(api);
    setMyList(
      data.itemsArray.map((item) => item.name)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      let api = `items?userId=${user?._id}`;
      const { data } = await apiCall(api);
      setMyList(
        data.itemsArray.map((item) => item.name + " " + item.price + "$")
      );
    };
    fetchData();
  }, [user, apiCall]);

  const addItem = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await apiCall("items/addItem", "POST", {
        name,
        price,
        user,
      });
      console.log(status);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setName("");
    setPrice("");
    document.getElementById("inputItemName").value = "";
    document.getElementById("inputItemPrice").value = "";
    fetchData();
  };

  const deleteItem = async (item, event) => {
    event.preventDefault();
    let name = myList.find((x) => x === item.item);
    console.log("item deleted: " + name + price);
    try {
      const { status, data } = await apiCall("items/deleteItem", "DELETE", {
        name,
        price,
        user,
      });
      console.log(status);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };
  const logout = () => {
    dispatch({ type: "LOGOUT", payload: null });
    navigate("/"); // go to login
  };

  // const handleName = (e) => {
  //   setName(e.target.value);
  // };
  // const handlePrice = (e) => {
  //   setPrice(e.target.value);
  // };

  return (
    <div className="homePageDiv">
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="border w-25 p-3 rounded">
          <h2 className="m-2">{user?.name}'s items list</h2>

          <div className="app">
            <div className="form-group" style={{ textAlign: "left" }}>
              <label htmlFor="exampleInputEmail1">Add item</label>{" "}
              <input
                type="text"
                name="itemName"
                id="inputItemName"
                className="form-control"
                placeholder="Enter a item"
                // onChange={handleName}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
            </div>
            <div className="form-group" style={{ textAlign: "left" }}>
              <label htmlFor="exampleInputEmail1">Add price</label>
              <input
                type="number"
                name="itemPrice"
                id="inputItemPrice"
                className="form-control"
                placeholder="Enter a price"
                // onChange={handlePrice}
                onChange={(e) => setPrice(e.target.value)}
              />
              <br />
            </div>
            <button
              className="btn btn-outline-dark"
              onClick={(e) => addItem(e)}
            >
              Submit
            </button>
            <button
              id="logoutButton"
              className="btn btn-outline-light"
              onClick={logout}
            >
              Logout
            </button>
            <br />
            <br />

            {myList.map((item) => (
              <div className="m-1" key={item}>
                <button
                  id="itemBtn"
                  className="btn btn-outline-warning"
                  onClick={(e) => deleteItem({ item }, e)}
                >
                  {item}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
