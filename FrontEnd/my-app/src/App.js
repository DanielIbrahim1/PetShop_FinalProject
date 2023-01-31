import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import {
  doLoginAsync,
  stayLogged,
} from "./app/Authentication/authenticationSlice";
import { useDispatch } from "react-redux";
import { getCart } from "./app/Cart/cartSlice";
import Header from "./features/Header";
import Category from "./app/Category/Category";
import Footer from "./features/Footer";
function App() {
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      dispatch(doLoginAsync({ refresh: loggedInUser }));
      getCart();
    }
  }, []);
  return (
    <div >
      
        <Header></Header>
        <div>
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
     
    </div>
  );
}

export default App;
