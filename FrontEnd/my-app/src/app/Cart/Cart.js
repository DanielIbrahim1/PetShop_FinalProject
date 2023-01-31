import React, { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLogged, selectToken, selectUserId } from "../Authentication/authenticationSlice";
import {
  addItemToCart,
  selectMyCart,
  resetCart,
  removeItemFromCart,
  selectTotal_order_price,
  getCart,
  testRefresh,
  decAmount
} from "../Cart/cartSlice";
import { checkoutAsync } from "../Orders/orderSlice";
import { Button, Modal, Typography, Box } from "@mui/material";



const Cart = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const myCart = useSelector(selectMyCart);
  const total_order_price = useSelector(selectTotal_order_price);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const logged = useSelector(selectLogged);
  const userId = useSelector(selectUserId);

  useEffect(() => {

    dispatch(getCart());
  }, []);

  return (
    <div className="checkout-container">
      <section class="page-header"><div class="content text-center"><h1 class="mb-3">Cart
      </h1></div></section>
      <section className="cart shopping page-wrapper">

        <div className="container">

          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="product-list">
                <table className="table shop_table shop_table_responsive cart" cellspacing="0">
                  <thead>
                    <tr>
                      <th className="product-thumbnail"> </th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Total</th>
                      <th className="product-remove"> </th>
                    </tr>
                  </thead>
                  {myCart &&
                    myCart.map((item) => (
                      <tbody>
                        <tr className="cart_item">
                          <td className="product-thumbnail" data-title="Thumbnail">
                            <img src={`http://127.0.0.1:8000/static/images/${item.photo}`} class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                          </td>

                          {/* Cart loop */}
                          <td class="product-name" data-title="Product">
                            <a href="#">{item.product}</a>
                            {/* Product description */}
                          </td>

                          <td class="product-price" data-title="Price">
                            <div>{item.price}</div>

                          </td>

                          <td className="product-quantity" data-title="Quantity">
                            <div className="quantity">
                              <label className="sr-only" >{item.amount}</label>
                              <button className="decrement-btn"
                                onClick={() =>
                                  dispatch(
                                    decAmount({
                                      _id: item._id,
                                      product: item.description,
                                      amount: 1,
                                      // photo:item.photo,
                                      price: parseInt(item.price),
                                      total_price: parseInt(item.price),
                                    })
                                  )
                                }>-</button>
                              <span type="number" min="1" >{item.amount}</span>

                              <button class="increment-btn"
                                onClick={() =>
                                  dispatch(
                                    addItemToCart({
                                      _id: item._id,
                                      product: item.description,
                                      amount: 0,
                                      // photo:item.photo,
                                      price: parseInt(item.price),
                                      total_price: parseInt(item.price),
                                    })
                                  )
                                }>+</button>
                            </div>

                          </td>


                          <td class="product-subtotal" data-title="Total">

                            <div>{item.total_price}</div>

                          </td>
                          <td >
                            <button class="delete-btn" type="button"
                              aria-label="Remove this item"
                              data-product_id="30"
                              data-product_sku=""
                              onClick={() => dispatch(removeItemFromCart(item._id))}>
                              X</button>
                          </td>
                          {/* Delete from cart */}
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </div>
          </div>

          {/* CART VIEW */}
          <div class="row justify-content-end">
            <div class="col-lg-4">
              <div class="cart-info card p-4 mt-4">
                <h4 class="mb-4">Cart totals</h4>

                <ul class="list-unstyled mb-4">
                  <li class="d-flex justify-content-between pb-2 mb-3">
                    <h5>Subtotal</h5>
                    <span>{total_order_price}</span>
                    {/* All products price */}
                  </li>
                  <li class="d-flex justify-content-between pb-2 mb-3">
                    <h5>Shipping</h5>
                    <span>Free</span>
                  </li>
                  {/* Shipping ?  */}
                  <li class="d-flex justify-content-between pb-2">
                    <h5>Total</h5>
                    <span>{total_order_price}</span>
                  </li>
                  {/* All products price + Shipping */}
                </ul>
                <ul >
                  {/* class="btn btn-main btn-small" */}
                  <il > <Button class="btn btn-main btn-small" onClick={handleOpen}>Proceed to checkout</Button></il>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description" >
                    <Box className='checkout-box'>
                      <Typography >
                        <div >
                          <h4 class="mb-4">Billing Details</h4>
                          <form class="checkout-form">
                            <div class="row">
                              <div class="col-lg-4">
                                <div class="form-group mb-4">
                                  <label for="first_name">First Name</label>
                                  <input type="text" class="form-control" id="first_name" placeholder="" />
                                </div>
                              </div>
                              <div class="col-lg-4">
                                <div class="form-group mb-4">
                                  <label for="Last_Name">Last Name</label>
                                  <input type="text" class="form-control" id="last_name" placeholder="" />
                                </div>
                              </div>

                              <div class="col-lg-4">
                                <div class="form-group mb-4">
                                  <label for="Street_Address">Street Address</label>
                                  <input type="text" class="form-control" id="street" placeholder="" />
                                </div>
                              </div>
                              <div class="col-lg-4">
                                <div class="form-group mb-4">
                                  <label for="Apartment">Apartment</label>
                                  <input type="text" class="form-control" id="apartment" placeholder="Apartment" />
                                </div>
                              </div>

                              <div class="col-lg-4">
                                <div class="form-group mb-4">
                                  <label for="City">Town / City </label>
                                  <input type="text" class="form-control" id="city" placeholder="Apartment" />
                                </div>
                              </div>

                              <div class="col-lg-4">
                                <div class="form-group mb-4">
                                  <label for="Postcode">Postcode / ZIP</label>
                                  <input type="text" class="form-control" id="postcode" placeholder="" />
                                </div>
                              </div>
                              <div class="col-lg-4">
                                <div class="form-group mb-4">
                                  <label for="Phone">Phone </label>
                                  <input type="tel" class="form-control" id="phone" placeholder="" />
                                </div>
                              </div>
                              <div class="col-lg-4">
                                <div class="form-group mb-4">
                                  <label for="Email_address">Email address </label>
                                  <input type="text" class="form-control" id="email" placeholder="" />
                                </div>
                              </div>
                            </div>
                          </form></div></Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                        <div class="billing-details mt-2">
                          <h4 class="mb-4">Billing Details</h4>
                          <form class="checkout-form">
                            <div class="row">
                              <div class="col-lg-7">
                                <div class="form-group mb-4">
                                  <label for="Credit_card_number">Credit card number:</label>
                                  <input class="form-control" placeholder="" />
                                </div>
                              </div>
                              <div class="col-lg-3">
                                <div class="form-group mb-4">
                                  <label for="Expiration_date">Expiration date:</label>
                                  <input type="month" class="form-control" id="first_name" placeholder="" />
                                </div>
                              </div>

                              <div class="col-lg-2">
                                <div class="form-group mb-4">
                                  <label for="CVC">CVC:</label>
                                  <input class="form-control" placeholder="" maxLength="3" />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>

                        {logged ?
                          <Link to={`/profile/${userId}/myorders`}> <Button class="btn btn-main btn-small" onClick={() => {
                            dispatch(checkoutAsync({ myCart: myCart, token: token }));
                            dispatch(resetCart())
                          }}>Check out</Button></Link>

                          : <p><p className="lead"><Link to="/login">Please Login in first!</Link></p></p>
                        }
                      </Typography>
                    </Box>
                  </Modal> </ul>

              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
  <div>
    {myCart && (
      <button onClick={() => dispatch(resetCart())}>RESET CART</button>
    )}
    {myCart &&
      myCart.map((item) => (
        <div key={item._id}>
          <div>
            {" "}
            <p>
              <button
                onClick={() => dispatch(removeItemFromCart(item._id))}
                style={{ background: "red" }}
              >
                Remove Item
              </button>{" "}
              |&nbsp;
              {item.product} | Price: {item.price} | Amount: {item.amount} |{" "}
              Total: {item.total_price}
            </p>
          </div>
        </div>
      ))}
    {myCart && (
      <div>
        <h4>Total Price: {total_order_price} </h4>
        <h4>
          <button
            onClick={() =>
              dispatch(checkoutAsync({ myCart: myCart, token: token }))
            }
          >
            Order
          </button>
        </h4>
      </div>
    )}
  </div>
};

export default Cart;