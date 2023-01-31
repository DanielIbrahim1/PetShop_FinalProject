import axios from "axios";

const GET_ALL_USERS_URL = "http://127.0.0.1:8000/getuser/";
const GET_PROFILE_URL = "http://127.0.0.1:8000/getprofile/";
const DELETE_USER_URL = "http://127.0.0.1:8000/deleteuser/";
const UPDATE_USER_URL = "http://127.0.0.1:8000/updateuser/";
const GET_USER_URL = "http://127.0.0.1:8000/getoneuser/";

export function getUser(id, token) {
  if (id !== 0) {
    return new Promise((resolve) =>
      axios
        .get(GET_USER_URL + id, {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        })
        .then((res) => resolve({ data: res.data }))
    );
  } else {
    return new Promise((resolve) =>
      axios
        .get(GET_ALL_USERS_URL + id, {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        })
        .then((res) => resolve({ data: res.data }))
    );
  }
}

export function getProfile(id, token) {
  return new Promise((resolve) =>
    axios
      .get(GET_PROFILE_URL + id, {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}

export function deleteUser(id, token) {
  console.log(token);
  return new Promise((resolve) =>
    axios
      .delete(DELETE_USER_URL + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}

export function updateUser(User_Details, id, token) {
  return new Promise((resolve) =>
    axios
      .patch(UPDATE_USER_URL + id, User_Details, {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}
