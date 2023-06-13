import React, { useState, useEffect } from "react";
import { useApiContext } from "../hooks/useApiContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navigator from "../components/Navigator";
import Search from "../components/Search";

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
    <div>
      <Navigator/>
      <Search/>
    </div>
  );
};
