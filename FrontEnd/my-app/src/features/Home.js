import { Link, Outlet, useParams } from "react-router-dom";
import { selectProductList } from "../app/Products/ProductSlice";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../app/Cart/cartSlice";
import Product from "../app/Products/Product";
import Category from "../app/Category/Category";
import SingleProd from "../app/Products/SingleProd";

function Home() {
    const products = useSelector(selectProductList);
    let params = useParams();
    let cat_id = params.catID;
    let prod_id=params.prodID
    let cat_name = params.cat_name
    const dispatch = useDispatch();
    return (

        // should try to add this function to product component !!!! 
        // maybe create Top home componnet 
        <div className="home-container">
            <div className="main-slider slider slick-initialized slick-slider">

                <div class="slider-item" style={{
                    backgroundImage: "url('http://127.0.0.1:8000/static/images/home-page.png')",
                    backgroundPosition: "50%", backgroundRepeat: "no-repeat"
                }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 col-6 offset-lg-6 offset-md-6">
                                <div class="slider-caption">
                                    <h1 class="mt-2 mb-5"><span class="text-color">
                                       
                                         </span> <br></br>
                                        
                                             </h1>
                                    {/* <a href="#" class="btn btn-main"></a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




           {!prod_id&&
            <Product></Product>}
            

           
            <section class="features border-top">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-sm-6 col-md-6">
                            <div class="feature-block">
                                <i class="tf-ion-android-bicycle"></i>
                                <div class="content">
                                    <h5>Free Shipping</h5>
                                    <p>On all order over $39.00</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-md-6">
                            <div class="feature-block">
                                <i class="tf-wallet"></i>
                                <div class="content">
                                    <h5>30 Days Return</h5>
                                    <p>Money back Guarantee</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-md-6">
                            <div class="feature-block">
                                <i class="tf-key"></i>
                                <div class="content">
                                    <h5>Secure Checkout</h5>
                                    <p>100% Protected by paypal</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-md-6">
                            <div class="feature-block">
                                <i class="tf-clock"></i>
                                <div class="content">
                                    <h5>24/7 Support</h5>
                                    <p>All time customer support </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div><Outlet></Outlet></div>
        </div >
    )
}
export default Home;