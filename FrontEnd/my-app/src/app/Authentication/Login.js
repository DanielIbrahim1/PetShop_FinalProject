import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Link, NavLink } from "react-router-dom";

import {
  logout,
  doLoginAsync,
  selectEmail,
  selectLogged,
  selectStaff,
  selectSuperUser,
  selectToken,
  selectUserName,
} from "./authenticationSlice";
const Login = () => {
  const dispatch = useDispatch();

  const loggedUsername = useSelector(selectUserName);
  const logged = useSelector(selectLogged);

  //   const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <div className="account section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-form border p-5">

                <div className="text-center heading">
                  <h2 className="mb-2">Login</h2>
                  <p className="lead">Don’t have an account? <Link to={`/register`}>Create a free account</Link></p>
                </div>

                <form action="#">
                  <div className="form-group mb-4">
                    <label for="#">Enter username</label>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" placeholder="Enter Username" />
                  </div>
                  <div className="form-group">
                    <label for="#">Enter Password</label>
                    {/* <a className="float-right" href="">Forget password?</a> */}

                    <input type={"password"} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
                  </div>

                 <Link onClick={() => dispatch(doLoginAsync({ username: username, password: password, }))} 
                 to="/" className="btn btn-main mt-3 btn-block" >Login </Link>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};
export default Login;
