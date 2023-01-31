import react, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useParams,
  useNavigate,
  Outlet,
  Link,
  NavLink,
} from "react-router-dom";
import {
  addProductAsync,
  deleteProductAsync,
  getProductAsync,
  updateProductAsync,
  selectProductList,
} from "./ProductSlice";
import { selectToken } from "../Authentication/authenticationSlice";

export function StaffProducts() {
  let params = useParams();
  let cat_id = params.id;
  let cat_name = params.name
  const prodList = useSelector(selectProductList);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState("");

  const formData = new FormData();
  formData.append("description", desc);
  formData.append("price", price);
  formData.append("category", cat_id);
  formData.append("photo", photo);
  const handleFileChange = (files) => {
    setPhoto(files[0]);
  };


  const [change1, setChange1] = useState("false");
  const [change2, setChange2] = useState("0");
  const [change3, setChange3] = useState("0");

  //run every time we choose category
  useEffect(() => {
    if (cat_id) {
      dispatch(getProductAsync(cat_id));
    }
  }, [cat_id]);

  // how to perform use effect so each time when the data is updated- we will see it?
  useEffect(() => {
    dispatch(getProductAsync(cat_id));
  }, [change1, change2, change3]);

  const refresh = () => {
    dispatch(getProductAsync(cat_id));
  };

  return (
    <div className="staff-prod">
      <h3 style={{ textAlign: "center" }}>
        <i>Category Products</i>
      </h3>

      <div >
 
        <div div className="col-lg-12 col-5 col-md-1 col-sm-1 mb-1" >
        
        <i className="product">Description: 
        &nbsp;&nbsp;&nbsp;

        <input onChange={(e) => setDesc(e.target.value)} /></i>
        &nbsp;&nbsp;&nbsp;


        <i className="product">Price:
        &nbsp;&nbsp;&nbsp;

        <input onChange={(e) => setPrice(e.target.value)} />
        </i>

        &nbsp;&nbsp;&nbsp;
        <i>Photo:</i>
        &nbsp;&nbsp;&nbsp;
        <input 
          type={"file"}
          alt={"test.jpeg"}
          onChange={(e) => handleFileChange(e.target.files)}
        ></input>
      <br></br>
      <br></br>
        <button
          onClick={() => {
            desc && price && photo
              ? dispatch(
                addProductAsync({
                  tempProd: formData,
                  token: token,
                })
              )
              : dispatch(alert("Must Type new name and price"));

            setChange3(desc);
          }}
        >
          Add New Product
        </button></div>
        
<br></br>


      </div>
      <div className="row">
        {prodList.map((prod) => (
          < div className="col-lg-2 col-12 col-md-6 col-sm-6 mb-5" >
            <div className="cat-box">
              <div className="product-wrap">
                <img className="photo-icon" src={`http://127.0.0.1:8000/static/images/${prod.photo}`} />
              </div>

              <div className="product-info">
                <h2 className="product-title h5 mb-0">{prod.description}</h2>


                <span className="price">
                  {prod.price}
                </span>
                <input className="staff-input" placeholder="product name" onChange={(e) => setDesc(e.target.value)}  />
                <input className="staff-input" placeholder="product pice" onChange={(e) => setPrice(e.target.value)} />

              </div>
              <button onClick={() => {
                dispatch(deleteProductAsync({ id: prod._id, token: token }));
                setChange2(prod._id);
              }}>DELETE
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                onClick={() => {
                  desc
                    ?
                     price
                      ? dispatch(
                        updateProductAsync({
                          tempProd: {
                            description: desc,
                            price: price,
                            photo: photo,
                          },
                          id: prod._id,
                          token: token,
                        })
                      )
                      
                      : dispatch(
                        updateProductAsync({
                          tempProd: { description: desc, photo: photo },
                          id: prod._id,
                          token: token,
                        })
                      )
                    : dispatch(
                      updateProductAsync({
                        tempProd: { price: price, photo: photo },
                        id: prod._id,
                        token: token,
                      })
                    )
                    ;

                  setChange1(price + desc);
                }}
              >
                UPDATE
              </button>
                 
              </div>
          </div>
        ))}
      </div>


    </div>
  );
}

export default StaffProducts;
