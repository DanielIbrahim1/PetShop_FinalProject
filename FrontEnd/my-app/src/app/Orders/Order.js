import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { selectCustomerProdList, getDataAsync, delDataAsync } from '../customerSlice';
import { getOrderAsync, addOrderAsync, selectOrderList, selectOrderDetailList, getOrderDetailAsync } from "./orderSlice";
import { selectToken, selectUserId } from "../Authentication/authenticationSlice";
import { Outlet, Link, NavLink, useParams } from "react-router-dom";
import { Button, Modal, Typography, Box, } from "@mui/material";
import { getProductAsync, selectProductList } from "../Products/ProductSlice";

export function Order() {
  const orders = useSelector(selectOrderList);
  // prodList name can be changed
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const orderDetail = useSelector(selectOrderDetailList);
  let params = useParams();
  let order_id = params.id;
  const products = useSelector(selectProductList);


  useEffect(() => {
    dispatch(getOrderAsync(token));
  }, []);

  useEffect(() => {
    dispatch(getOrderDetailAsync({ id: order_id, token: token }));
    dispatch(getProductAsync(0));
  }, [order_id]);

  const getProdName = (orderedProd) => {
    const oneProd = products.filter((x) => x._id == orderedProd);
    return oneProd;
  };

  return (
    <div className="checkout-container">
      <section class="page-header"><div class="content text-center"><h1 class="mb-3">My orders
      </h1></div></section>
      <section className="cart shopping page-wrapper">

        <div className="container">

          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="product-list">
                <table className="table shop_table shop_table_responsive cart" cellspacing="0">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Order</th>
                      <th className="product-name">Date</th>
                      <th className="product-price">Total</th>
                    </tr>
                  </thead>
                  {orders.map((order) => (
                    <tbody>

                      <tr className="cart_item">

                        <td className="product-thumbnail" data-title="Thumbnail">
                          <Button onClick={handleOpen}>

                            {order._id}

                          </Button>

                        </td >


                        <td className="product-name" data-title="Product">
                          <Link onClick={handleOpen} to={`/myorders/${order._id}`}>{order.date}</Link>
                        </td>

                        <td className="product-price" data-title="Price">
                          {order.order_total_price}
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
          <div className="row justify-content-end">
            <div className="col-lg-4">
              <ul >
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description" >
                  <Box className='checkout-box'>
                    <Typography >
                      <div className="row justify-content-center">
                        <div className="col-lg-12">
                          <div className="product-list">
                            <h4 class="mb-4">Order Details</h4>
                            <table className="table shop_table shop_table_responsive cart" cellspacing="0">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th className="product-thumbnail">Product</th>
                                  <th className="product-name"> Price</th>
                                  <th className="product-price">Amount</th>
                                  <th className="product-price">Total</th>
                                </tr>
                              </thead>

                              {/* <div> */}


                              <tbody>
                                {orderDetail.map((orDetail) => (
                                  <tr className="cart_item">
                                    <td className="cart_item" data-title="Thumbnail">
                                      <img className="photo-icon" src={`http://127.0.0.1:8000/static/images/${orDetail.photo}`} />
                                    </td>

                                    <td key={order_id} className="cart_item">
                                      {getProdName(orDetail.product)[0].description}
                                    </td >

                                    <td key={order_id} className="cart_item">
                                      {orDetail.total_price / orDetail.amount}

                                    </td >

                                    <td key={order_id} className="cart_item">
                                      {orDetail.amount}


                                    </td >

                                    <td key={order_id} className="cart_item">
                                      {orDetail.total_price}

                                    </td >



                                  </tr>


                                ))}
                                <tr>
                                  <th>Total price</th>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <th>
                                    {order_id &&
                                      orderDetail.map((orderd) => orderd.order_total_price)[0]}</th>
                                </tr>

                              </tbody>


                            </table>

                          </div>
                        </div> </div>

                    </Typography>
                  </Box>

                </Modal> </ul> </div>
          </div>

        </div>
      </section>
    </div>);

}
export default Order;