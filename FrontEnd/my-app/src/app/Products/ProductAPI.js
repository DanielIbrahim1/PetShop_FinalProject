import axios from "axios";

const GET_PRODUCT_URL = "http://127.0.0.1:8000/getproduct/";
const GET_PRODUCT_URL_per = "http://127.0.0.1:8000/getproductper/";
const ADD_PRODUCT_URL = "http://127.0.0.1:8000/addproduct/";
const UPDATE_PRODUCT_URL = "http://127.0.0.1:8000/updateproduct/";
const DELETE_PRODUCT_URL = "http://127.0.0.1:8000/delteproduct/";

export function getProduct(category_id) {
  return new Promise((resolve) =>
    axios(GET_PRODUCT_URL_per + category_id).then((res) =>
      resolve({ data: res.data })
    )
  );
}

export function addProduct(newData, token) {
  console.log(newData);
  return new Promise((resolve) =>
    axios
      .post(ADD_PRODUCT_URL, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}

export function updateProduct(newData, id, token) {
  console.log(token);
  return new Promise((resolve) =>
    axios
      .patch(UPDATE_PRODUCT_URL + id, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}

export function deleteProduct(id, token) {
  return new Promise((resolve) =>
    axios
      .delete(DELETE_PRODUCT_URL + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}
