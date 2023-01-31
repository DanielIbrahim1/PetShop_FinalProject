import axios from "axios";

const GET_CATEGORY_URL = "http://127.0.0.1:8000/getcategory/";
const ADD_CATEGORY_URL = "http://127.0.0.1:8000/addcategory/";
const UPDATE_CATEGORY_URL = "http://127.0.0.1:8000/updatedcategory/";
const DELETE_CATEGORY_URL = "http://127.0.0.1:8000/deletecategory/";

export function getCategory() {
  return new Promise((resolve) =>
    axios(GET_CATEGORY_URL).then((res) => resolve({ data: res.data }))
  );
}

export function addCategory(newData, token) {
  console.log(newData);
  return new Promise((resolve) =>
    axios
      .post(ADD_CATEGORY_URL, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}

export function deleteCategory(id, token) {
  return new Promise((resolve) =>
    axios
      .delete(DELETE_CATEGORY_URL + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}

export function updateCategory(newData, id, token) {
  return new Promise((resolve) =>
    axios
      .put(UPDATE_CATEGORY_URL + id, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}
