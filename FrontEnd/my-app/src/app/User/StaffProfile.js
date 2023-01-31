import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  updateUserAsync,
  selectUserList,
  getUsersAsync,
  selectProfileList,
  getProfileAsync,
  deleteUserAsync,
} from "./userSlice";
import {
  selectToken,
  selectStaff,
} from "../Authentication/authenticationSlice";
import { Link, useParams } from "react-router-dom";

const StaffProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const token = useSelector(selectToken);
  const isStaff = useSelector(selectStaff);
  const userList = useSelector(selectUserList);
  // const singleUser = useSelector(selectSingleUser);
  const profileList = useSelector(selectProfileList);
  // const singleProfile = useSelector(selectSingleProfile);

  const [tempUsername, setUsername] = useState(null);
  const [tempEmail, setEmail] = useState(null);
  const [tempPassword, setPassword] = useState(null);
  const [tempFirst_name, setFirst_name] = useState(null);
  const [tempLast_name, setLast_name] = useState(null);
  const [tempPhone, setPhone] = useState(null);
  const [tempAddress, setAddress] = useState(null);
  const [tempGender, setGender] = useState(null);
  const [tempIs_Staff, setIsStaff] = useState(null);
  const [singleUser, SetSingleUser] = useState(null);


  const id = params.id;
  const updatedUser = {};


  const refresh = () => {
    dispatch(getUsersAsync({ id: 0, token: token }));
    dispatch(getProfileAsync({ id: 0, token: token }));
  };

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
    is_staff: tempIs_Staff,
    phone: tempPhone,
    address: tempAddress,
    gender: tempGender,

  };
  useEffect(() => {
    refresh();
  }, [token]);
  useEffect(() => {

  }, [userList, profileList])
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div>
        <table className="table-bordered">
          <thead>
            <th>User Id</th>
            <th>User name</th>
            <th>is staff</th>
            <th> </th>
          </thead>
          {userList.map((user) => (
            <tbody>
              <tr>
                <td><Link className="nav-link" to={`/staffMenu/users/${user.id}`}>
                  {user.id}</Link></td>
                <td>{user.username} </td>
                <td>   {user.is_staff == true && <i> staff</i>}</td>
                <td> <button className="delete-btn" type="button" onClick={() => {
                  dispatch(deleteUserAsync({ id: user.id, token: token }));
                  refresh();
                }}>Del</button></td>
              </tr>
            </tbody>))}
        </table>
      </div>

      <div>
        {id && (
          <div className="profile-form">
            <h1>user details</h1>
            {userList.map((user) => (
              <div key={user.username}>
                {user.id == id && (
                  <ul >
                    <div className="form-group mb-2">
                      Username - &nbsp;&nbsp;
                      <input placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}></input></div>

                    <div className="form-group mb-2">
                      First name - &nbsp;
                      <input placeholder={user.first_name}
                        onChange={(e) => setFirst_name(e.target.value)}></input></div>

                    <div className="form-group mb-2">
                      Last name - &nbsp;&nbsp;
                      <input placeholder={user.last_name}
                        onChange={(e) => setLast_name(e.target.value)}></input></div>

                    <div className="form-group mb-2">
                      Email - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)} ></input></div>

                    <div>
                      {user.is_staff == "1" ?
                        <div>
                          <input type="radio" name="staff" value="1" checked />staff
                          &nbsp;
                          <input type="radio" name="staff" onChange={(e) => setIsStaff(e.target.value)} value="0" /> not a staff
                        </div>
                        : <div>
                          <input type="radio" onChange={(e) => setIsStaff(e.target.value)} name="staff" value="1" />staff
                          &nbsp;
                          <input type="radio" name="staff" onChange={(e) => setIsStaff(e.target.value)} value="0" checked /> not a staff
                        </div>}
                    </div>
                  </ul>
                )}
              </div>
            ))}

            {profileList.map((profile) => (
              <div key={profile.user}>
                {profile.user == id && (
                  <ul>
                    <div className="form-group mb-2">
                      Phone -&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        required
                        placeholder={profile.phone}
                        onChange={(e) => setPhone(e.target.value)}></input>
                    </div>
                    <div className="form-group mb-2">
                      Address  -&nbsp;
                      <input
                        placeholder={profile.address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></input>
                    </div>

                    <div className="form-group mb-2">
                      Gender  -&nbsp;&nbsp;
                      <input placeholder={profile.gender}
                        onChange={(e) => setGender(e.target.value)} ></input>
                    </div>
                  </ul>
                )}
              </div>
            ))}
            <Link to="/staffMenu/users">
              <button className="form-btn"
                type="button"
                onClick={() => {
                  UPDATE(tempUser);
                  dispatch(
                    updateUserAsync({
                      tempUser: updatedUser,
                      id: id,
                      token: token,
                    })
                  );
                  refresh();
                }}
              >
                update
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffProfile;