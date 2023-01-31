import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectUserName,
  selectEmail,
  selectToken,
  selectLogged,
  selectStaff,
  selectSuperUser,
  selectFirstName,
  selectLastName,
  selectPhone,
  selectAdress,
  selectGender,
  selectUserId,
} from "../Authentication/authenticationSlice";
import { updateUserAsync, getUsersAsync, selectUserList } from "./userSlice";
import { useParams } from "react-router-dom";


const Profile = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const email = useSelector(selectEmail);
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const phone = useSelector(selectPhone);
  const adress = useSelector(selectAdress);
  const gender = useSelector(selectGender);
  const logged = useSelector(selectLogged);
  const token = useSelector(selectToken);
  const userList = useSelector(selectUserList);

  const [tempUsername, setUsername] = useState(null);
  const [tempEmail, setEmail] = useState(null);
  const [tempPassword, setPassword] = useState(null);
  const [tempFirst_name, setFirst_name] = useState(null);
  const [tempLast_name, setLast_name] = useState(null);
  const [tempPhone, setPhone] = useState(null);
  const [tempAddress, setAddress] = useState(null);
  const [tempGender, setGender] = useState(null);
  const [refresher, setRefresher] = useState(null);

  const params = useParams();
  const id = params.id;
  useEffect(() => {
    dispatch(getUsersAsync({ id: id, token: token }));
    console.log(userList);
  }, []);

  const updatedUser = {};
  const UPDATE = (user) => {
    for (const [key, value] of Object.entries(user)) {
      if (value !== null) {
        updatedUser[key] = value;
      }
    }
    console.log(updatedUser);
  };

  const tempUser = {
    email: tempEmail,
    username: tempUsername,
    first_name: tempFirst_name,
    last_name: tempLast_name,
    phone: tempPhone,
    address: tempAddress,
    gender: tempGender,
  };

  return (
    <div >
      <form className="profile-form" >
        {userList.map((user) =>
          <div key={user._id}>
            {user._id  && (
              <div >
                <div className="form-group mb-2">
                  <label >Username </label>
                  <input placeholder={user.username} className="form-input" onChange={(e) => setUsername(e.target.value)}></input>
                  <button type="button" className="form-btn" onClick={() => {
                    UPDATE(tempUser);
                    dispatch(updateUserAsync({
                      tempUser: updatedUser,
                      id: userId,
                      token: token,
                    })
                    );
                  }} >Update</button>
                </div>

                <div className="form-group mb-2">
                  <label >First name</label>
                  <input placeholder={user.first_name} className="form-input" onChange={(e) => setFirst_name(e.target.value)}></input>
                  <button type="button" className="form-btn" onClick={() => {
                    UPDATE(tempUser);
                    dispatch(updateUserAsync({
                      tempUser: updatedUser,
                      id: userId,
                      token: token,
                    })
                    );
                  }}>Update</button>
                </div>

                <div className="form-group mb-2">
                  <label >Last name</label>
                  <input placeholder={user.last_name} onChange={(e) => setLast_name(e.target.value)} className="form-input"></input>
                  <button className="form-btn" type="button" onClick={() => {
                    UPDATE(tempUser);
                    dispatch(
                      updateUserAsync({
                        tempUser: updatedUser,
                        id: userId,
                        token: token,
                      })
                    );
                  }}>Update</button>
                </div>

                <div className="form-group mb-2">
                  <label >Email</label>
                  <input placeholder={user.email} onChange={(e) => setEmail(e.target.value)} className="form-input"></input>
                  <button className="form-btn" type="button" onClick={() => {
                    UPDATE(tempUser);
                    dispatch(
                      updateUserAsync({
                        tempUser: updatedUser,
                        id: userId,
                        token: token,
                      })
                    );
                  }}>Update</button>
                </div>

                <div className="form-group mb-2">
                  <label >Address</label>
                  <input placeholder={adress} onChange={(e) => setAddress(e.target.value)} className="form-input"></input>
                  <button className="form-btn" type="button" onClick={() => {
                    UPDATE(tempUser);
                    dispatch(
                      updateUserAsync({
                        tempUser: updatedUser,
                        id: userId,
                        token: token,
                      })
                    );
                  }}>Update</button>
                </div>

                <div className="form-group mb-2">
                  <label >Phone </label>
                  <input placeholder={phone} onChange={(e) => setPhone(e.target.value)} className="form-input"></input>
                  <button className="form-btn" type="button" onClick={() => {
                    UPDATE(tempUser);
                    dispatch(
                      updateUserAsync({
                        tempUser: updatedUser,
                        id: userId,
                        token: token,
                      })
                    );
                  }}>Update</button>
                </div>


              </div>)}
          </div>)}
      </form>


    </div>
  );
};

export default Profile;