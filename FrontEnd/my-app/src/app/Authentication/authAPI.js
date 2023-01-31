import axios from "axios";
const REGISTER_URL = "http://127.0.0.1:8000/register/";
const LOGIN_URL = "http://127.0.0.1:8000/login/";
const REFRESH_URL = "http://127.0.0.1:8000/login/refresh/";

export function register(User_Details) {
  return new Promise((resolve) =>
    axios
      .post(REGISTER_URL, User_Details)
      .then((res) => resolve({ data: res.data }))
  );
}

export function login(User_Details) {
  console.log(User_Details.refresh);
  if ("username" in User_Details) {
    return new Promise((resolve) =>
      axios
        .post(LOGIN_URL, User_Details)
        .then((res) => resolve({ data: res.data }))
    );
  } else {
    // console.log(User_Details);
    return new Promise((resolve) =>
      axios
        .post(REFRESH_URL, User_Details)
        .then((res) => resolve({ data: res.data }))
    );
  }
}
