// A mock function to mimic making an async request for data
import axios from "axios";

const ADD_ORDER_URL = "http://127.0.0.1:8000/checkout/";
const GET_ORDERS_URL = "http://127.0.0.1:8000/allorders/";
const GET_ORDER_DETAILS_URL = "http://127.0.0.1:8000/getorderdetails/";

export const checkout = (myCart, token) => {
  return new Promise((resolve) =>
    axios
      .post(ADD_ORDER_URL, myCart, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
};

export function getOrders(token) {
  return new Promise((resolve) =>
    axios(GET_ORDERS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))
  );
}

export function getorderDetails(id, token) {
  return new Promise((resolve) =>
    axios(GET_ORDER_DETAILS_URL + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))
  );
}

