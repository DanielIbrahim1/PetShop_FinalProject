import React, { useEffect } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCategoryList, getCategoryAsync } from "./categorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoryList);


  useEffect(() => {
    dispatch(getCategoryAsync());
  }, []);

  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default Category;
