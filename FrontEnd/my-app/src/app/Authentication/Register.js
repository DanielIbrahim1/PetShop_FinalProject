import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doRegisterAsync } from "./authenticationSlice";
import { Outlet, Link, NavLink } from "react-router-dom";


const Register = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [is_staff, setIs_staff] = useState(false);
    const [registerMSG, setRegisterMSG] = useState(false);

    return (


        <div className="signUp-container">
            <div className="account section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="login-form border p-5">
                                <div className="text-center heading">
                                    <h2 className="mb-2">Sign Up</h2>
                                    <p className="lead">Already have an account? <Link to="/login"> Login now</Link></p>
                                </div>

                                <form action="#" id={"register"}>
                                    <div className="form-group mb-4">
                                        <label for="First_Name">First Name</label>
                                        <input type="text" className="form-control" placeholder="First Name"
                                            onChange={(e) => setFirst_name(e.target.value)} required />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label for="#">Last name</label>
                                        <input type="text" className="form-control" placeholder="Enter last name"
                                            onChange={(e) => setLast_name(e.target.value)} required />
                                    </div>


                                    <div className="form-group">
                                        <label for="#">Email</label>
                                        <input type="email" className="form-control" placeholder="Enter email"
                                            onChange={(e) => setEmail(e.target.value)} required />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label for="#"> Username</label>
                                        <input type="text" className="form-control" placeholder="Enter username"
                                            onChange={(e) => setUsername(e.target.value)} required />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label for="#"> Address</label>
                                        <input type="text" className="form-control" placeholder="Enter Address"
                                            onChange={(e) => setAddress(e.target.value)} required />
                                    </div>


                                    <div className="form-group">
                                        <label for="#">Phone</label>
                                        <input type="tel" pattern="[0-9]{3}[0-9]{4}[0-9]{3}" className="form-control" placeholder="Enter phone"
                                            onChange={(e) => setPhone(e.target.value)} required />
                                        <small>Format: 050-4535-678</small><br></br>
                                    </div>
                                    <div className="form-group">
                                        <label for="#">Gender</label>
                                        <input type="text" className="form-control" placeholder="Enter Gender"
                                            onChange={(e) => setGender(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label for="#">Password</label>
                                        <input type="password" className="form-control" placeholder="Enter Password"
                                            onChange={(e) => setPassword(e.target.value)} required />
                                    </div>


                                    <button
                                        // type={"submit"}
                                        form={"register"}
                                        value={"Submit"}
                                        onClick={() =>
                                            dispatch(
                                                doRegisterAsync({
                                                    is_staff: is_staff,
                                                    email: email,
                                                    password: password,
                                                    username: username,
                                                    first_name: first_name,
                                                    last_name: last_name,
                                                    phone: phone,
                                                    address: address,
                                                    gender: gender,
                                                })
                                            )

                                        } className="btn btn-main mt-3 btn-block" >Register

                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
