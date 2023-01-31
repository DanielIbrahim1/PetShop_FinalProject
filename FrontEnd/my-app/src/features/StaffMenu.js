import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectStaff } from "../app/Authentication/authenticationSlice";

const StaffMenu = () => {
  const isStaff = useSelector(selectStaff);

  return (
    <div>

      <Outlet></Outlet>

    </div>
  );
};

export default StaffMenu;
