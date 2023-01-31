import React, { useEffect } from "react";
import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  // selectUserName,
  selectToken,
  selectStaff,
  logout,
  selectLogged,
  selectUserId,
  selectUserName,
} from "../app/Authentication/authenticationSlice";
import { getCategoryAsync, selectCategoryList } from "../app/Category/categorySlice";
import { getCart, selectMyCart, selectTotal_order_price, removeItemFromCart, } from "../app/Cart/cartSlice";


const Header = () => {
  const dispatch = useDispatch();
  const isStaff = useSelector(selectStaff);
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const categories = useSelector(selectCategoryList);
  const loggedUsername = useSelector(selectUserName);
  const logged = useSelector(selectLogged);
  const myCart = useSelector(selectMyCart);
  const total_order_price = useSelector(selectTotal_order_price);

  useEffect(() => {
    dispatch(getCategoryAsync());
    dispatch(getCart());
  }, []);

  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-light bg-white w-100 navigation" id="navbar">
        <div className="container">
          <Link className="navbar-brand font-weight-bold" to={{ pathname: "/" }}>
          <img src="http://127.0.0.1:8000/static/images/new-logo3.png"></img></Link>
          {/* Home page */}

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar"
            aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

           
          <div className="collapse navbar-collapse " id="main-navbar">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item active">
                
                <Link className="nav-link" to={{ pathname: "/" }}>Home</Link>
              </li>
              {/* Home page */}
              <li></li>
              
              <li className="nav-item">
                <a className="nav-link" href="#">About Us</a>
              </li>
              {/* About us page */}




              <li className="nav-item dropdown dropdown-slide">
                <Link className={"nav-link dropdown-toggle"} to="/" id="navbarDropdown4" role="button" data-delay="350"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  Categories</Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown4">
                  <li><Link to="/">All products</Link></li>
                  <li>{categories.map((cat) => <Link key={cat._id} to={`/${cat._id}`}> {cat.name}</Link>)}</li>

                </ul>
              </li>


              {/* Possible category loop with links */}

              {!logged && <li className="nav-item dropdown dropdown-slide">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown5" role="button" data-delay="350"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Account
                </a>
                {/* Login/Register pages */}

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown5">
                  <li><Link to={{ pathname: "/login" }}>Login Page</Link></li>
                  {/* Login Page */}

                  <li><Link to={{ pathname: "/register" }}>Register</Link></li>
                  {/* SignUp Page */}

                </ul>
              </li>}
              {isStaff && <li className="nav-item dropdown dropdown-slide">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown5" role="button" data-delay="350"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Admin
                </a>
                {/* Login/Register pages */}

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown5">
                  <li> <Link className="nav-link " to="/staffMenu/users"> Users </Link></li>
                  {/* Login Page */}

                  <li> <Link className="nav-link " to="/staffMenu/staffCategories"> Categories/Products</Link></li>
                  {/* SignUp Page */}

                </ul>
              </li>}
            </ul>
          </div>


          <ul class="top-menu list-inline mb-0 d-none d-lg-block" id="top-menu">
            <li class="list-inline-item">
              <a href="#" class="search_toggle" id="search-icon"><i class="tf-ion-android-search"></i></a>
            </li>
            {/* serach  */}



            <li class="dropdown cart-nav dropdown-slide list-inline-item">
            <div>
              <a href="#" class="dropdown-toggle cart-icon" data-toggle="dropdown" data-hover="dropdown">
                <i className="tf-ion-android-cart"><a className="numberCircle"
                >{myCart.length }</a></i>
              </a>
              </div>
              {/* <i class="tf-ion-ios-person mr-3"></i> */}

              


              <div class="dropdown-menu cart-dropdown">
              {myCart &&
                  myCart.map((item) => (
                <div>   
                    <div class="media">

                      <img class="media-object img-fluid mr-3" src={`http://127.0.0.1:8000/static/images/${item.photo}`} alt="image" />

                      <div class="media-body">
                        <h6>{item.product}</h6>

                        <div class="cart-price">
                          <span >{item.amount} x{" "}</span>
                          <span>{item.price}{" "}₪ </span>
                          <span class="cart-price">
                          <span class="total-price ">{item.total_price}{" "}₪</span>
                          </span>
                        </div>
                      </div>
                      <div className=""><button  onClick={() => dispatch(removeItemFromCart(item._id))}
                      class="product-delete-btn">X</button> </div>
                    </div>

                </div>))}

                <div class="cart-summary">
                  <span class="h6">Total</span>
                  <span class="total-price h6">{total_order_price}{" "}₪</span>

                  <div class="text-center cart-buttons mt-3">
                    <Link to={{ pathname: "/cart" }} className="btn btn-small btn-transparent btn-block">View Cart</Link>

                    <Link to={`/myorders/${userId}`} className="btn btn-small btn-main btn-block">My orders</Link>

                  </div>

                </div>
              </div>
            </li>

            {/* Cart */}



            <li class="list-inline-item">  {/* profile icon */}

              {token && <Link to={`/profile/${userId}`}>
                <i class="tf-ion-ios-person mr-3"></i>
              </Link>} </li>
            {logged === true && <i className="font-weight-bold" ><u>Hello, {loggedUsername}!</u></i>} &nbsp;
            {logged && <Link to="/" onClick={() => dispatch(logout())}>
              <img className="media-object img-fluid mr-3" src={`http://127.0.0.1:8000/static/images/check-out.png`} alt="image" />
            </Link>}

          </ul>

        </div>
        <div>
          {/* <Outlet></Outlet> */}
        </div>
      </nav>
    </div>
  );
};

export default Header;

