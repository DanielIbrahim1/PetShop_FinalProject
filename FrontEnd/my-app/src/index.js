import React from "react";
import { BrowserRouter, Routes, Route, Link, } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

import Login from "./app/Authentication/Login";
import Product from "./app/Products/Product";
import SingleProd from "./app/Products/SingleProd";
import Category from "./app/Category/Category";
import StaffCategories from "./app/Category/StaffCategories";
import Register from "./app/Authentication/Register";
import StaffProducts from "./app/Products/StaffProducts";
import Profile from "./app/User/Profile";
import StaffMenu from "./features/StaffMenu";
import StaffProfile from "./app/User/StaffProfile";
import Cart from "./app/Cart/Cart";
import Order from "./app/Orders/Order";
import Home from "./features/Home";

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>

          <Route path="/" element={<Home />}>
            <Route path=":catID" element={<Category />}>
              
            </Route>
            <Route path=":prodID" element={<SingleProd />}></Route>
          </Route>

          <Route path="/login" element={<Login />}></Route>

          <Route path="/cart" element={<Cart />}></Route>

          <Route path="/register" element={<Register />}></Route>

          <Route path="/myorders/:id" element={<Order/>}>

          </Route>          
         
          {/* <Route path="/orderdetails" element={<OrderDetails/>}/> */}


          <Route path="/category" element={<Category />}>
            <Route path=":catID" element={<Product />}>
              <Route path="/category/:catID/product/:prodID" element={<SingleProd />}> </Route>
            </Route>
          </Route>

          <Route path="/staffMenu" element={<StaffMenu />}>
            <Route path="/staffMenu/users" element={<StaffProfile />}>
              <Route
                path="/staffMenu/users/:id"
                element={<StaffProfile />}
              ></Route>
            </Route>
            <Route
              path="/staffMenu/staffCategories"
              element={<StaffCategories />}
            >
              <Route
                path="/staffMenu/staffCategories/category_product/:id"
                element={<StaffProducts />}
              ></Route>
            </Route>
          </Route>
          <Route path="/profile/:id" element={<Profile />}>
            <Route path="/profile/:id/myorders/" element={<Order />}>
              {/* <Route path="/profile/:id/myorders/:id" element={<OrderDetails />}></Route> */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
  /* </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
