import React, { useEffect, useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCategoryList,
  getCategoryAsync,
  addCategoryAsync,
  deleteCategoryAsync,
  updateCategoryAsync,
} from "./categorySlice";
import { selectToken } from "../Authentication/authenticationSlice";

const StaffCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoryList);
  const [name, setName] = useState("");
  const token = useSelector(selectToken);

  const [change1, setChange1] = useState("false");
  const [change2, setChange2] = useState("0");
  const [change3, setChange3] = useState("0");

  useEffect(() => {
    dispatch(getCategoryAsync());
  }, [change1, change2, change3]);

  const refresh = () => {
    dispatch(getCategoryAsync());
  };

  return (
    <div className="staff-prod">
      <h3 style={{ textAlign: "center" }}>
        <i >Our Categories</i>
      </h3>
      <h5>
        <i> Add category</i>
      </h5>
      <i>Category name: </i>

      <input onChange={(e) => setName(e.target.value)} />
      &nbsp;&nbsp;
      <button
        onClick={() => {
          name
            ? dispatch(
              addCategoryAsync({ tempCat: { name: name }, token: token })
            )
            : dispatch(alert("Must Type a new name"));

          setChange3(name);
        }}>
        Add category      </button>
      <br />
      <br />


      <div className="row">
        {categories.map((tempCat) => (
          < div className="col-lg-2 col-12 col-md-6 col-sm-6 mb-5" >
            <div className="cat-box">
              <Link className="nav-link" key={tempCat._id}
                to={`/staffMenu/staffCategories/category_product/${tempCat._id}`} >
                <div className="product-info"> {tempCat.name}
                  <input className="staff-input" placeholder="category name" onChange={(e) => setName(e.target.value)} />
                </div>
                <button onClick={() => {
                  dispatch(deleteCategoryAsync({ id: tempCat._id, token: token }));
                  setChange2(tempCat._id);
                }}>
                  Delete
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => {
                  setChange1(name);
                  name
                    ? dispatch(
                      updateCategoryAsync({
                        tempCat: { name: name },
                        id: tempCat._id,
                        token: token,
                      })
                    )
                    : dispatch(alert("Must Type a new name"));
                }}>
                  Update
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <Outlet></Outlet>
    </div>
  );
};

export default StaffCategories;
