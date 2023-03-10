import React, { useEffect } from "react";
import { Outlet, Link, NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductAsync,
  selectProductList,
  getOneProduct,
  selectSingleProd,
} from "./ProductSlice";

const SingleProd = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList);
  const singleProduct = useSelector(selectSingleProd);
  let params = useParams();

  let prod_id = params.prodID;
  let cat_id = params.catID;
  let SingleProd = "";
  //   run every time we open menu page
  // const getOneProduct = (product_id) => {
  //   SingleProd = products.filter((prod) => prod.id == product_id);
  // };
  // console.log(prod_id);

  useEffect(() => {
    dispatch(getOneProduct(prod_id));
  }, [prod_id]);

  return (
    <div>
      {singleProduct.map((prod) => (
        <ul>
          {<h2>Selected Product:</h2>}
          <h3>{prod.description}</h3>
          <br></br>
          <h3>{" price: " + prod.price}</h3>
          <img
            style={{ width: "300px" }}
            src={`http://127.0.0.1:8000/static/images/${prod.photo}`}
          />
        </ul>
      ))}
    </div>
  );
};

export default SingleProd;
