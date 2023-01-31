import React, { useEffect, useState } from "react";
import { Outlet, Link, NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductAsync, selectProductList, selectSingleProd } from "./ProductSlice";
import {
  addItemToCart,
  selectMyCart,
  resetCart,
  removeItemFromCart,
} from "../Cart/cartSlice";
import Cart from "../Cart/Cart";
import { selectCategoryList } from "../Category/categorySlice";
import SingleProd from "./SingleProd";


const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList);
  const myCart = useSelector(selectMyCart);
  const categories = useSelector(selectCategoryList);
  const singleProduct = useSelector(selectSingleProd);
  const [amount, setAmount] = useState("");

  let params = useParams();
  let cat_id = params.catID;
  let prod_id = params.prodID // let cat_name = params.cat

  //run every time we open menu page

  //run every time we switch category
  useEffect(() => {
    if (cat_id) {
      dispatch(getProductAsync(cat_id));
    } else {
      dispatch(getProductAsync(0));
    }
  }, [cat_id]);

  return (
    <section className="section products-main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="title text-center">
              {/* should check if want to change the name with the category name!!  */}

              {!cat_id && <h2>All products</h2>}
              {cat_id &&
                categories.filter(item => item._id == cat_id).map((cat) => <h2> {cat.name}</h2>)}

            </div>
          </div>
        </div>

        <div className="row">

          {!cat_id &&

            products.map((prod) =>
            
              < div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5" >
                <div className="product">
                  <div className="product-wrap">

                    <Link key={prod._id} to={`/${prod._id}`} className="">
                      <img className="img-fluid w-100 mb-3 img-first" src={`http://127.0.0.1:8000/static/images/${prod.photo}`} />
                    </Link>

                  </div>
                  <div className="product-hover-overlay">

                    {/* add to cart */}

                    <button className="btn tf-ion-android-cart" onClick={() =>
                      dispatch(
                        addItemToCart({
                          _id: prod._id,
                          product: prod.description,
                          amount: 1,
                          photo: prod.photo,
                          price: parseInt(prod.price),
                          total_price: parseInt(prod.price),
                        })
                      )
                    }></button>
                  </div>


                  <div className="product-info">
                    <h2 className="product-title h5 mb-0">{prod.description}</h2>


                    <span className="price">
                      {prod.price}
                    </span>

                  </div>
                </div>
              </div>)}
        </div>

        {/* {prod_id &&

          singleProduct.map((prod) => (
            <ul>
              {<h2>Selected Product:</h2>}
              <h3>{prod.description}</h3>
              {" id: " + prod._id}
              <br></br>
              {" price: " + prod.price}
              <br></br>
              {" photo: " + prod.photo}
              <br></br>
              {" category: " + prod.category}
            </ul>
          ))} */}


        <div className="row">
          {cat_id &&
            products.filter(prodCat=>prodCat.category==cat_id).map((prod) =>
              < div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5" >
                <div className="product">

                  <div className="product-wrap">
                    <Link key={prod._id} to={`/${prod._id}`} className="btn">
                      <img className="img-fluid w-100 mb-3 img-first" src={`http://127.0.0.1:8000/static/images/${prod.photo}`} />
                    </Link>
                  </div>

                  <div className="product-hover-overlay">

                    {/* add to cart */}

                    <button className="btn tf-ion-android-cart" onClick={() =>
                      dispatch(
                        addItemToCart({
                          _id: prod._id,
                          product: prod.description,
                          amount: 1,
                          photo: prod.photo,
                          price: parseInt(prod.price),
                          total_price: parseInt(prod.price),
                        })
                      )
                    }></button>

                  </div>


                  <div className="product-info">
                    <h2 className="product-title h5 mb-5">{prod.description}</h2>
                    {/* product name */}
                    <span className="price">
                      {prod.price}
                    </span>
                    {/* product price */}
                  </div>
                </div>
              </div>
              )}
              
        </div>
      </div>
    </section >


  );
};

export default Product;
