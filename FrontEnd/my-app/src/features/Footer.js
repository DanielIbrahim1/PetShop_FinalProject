import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCategoryList } from "../app/Category/categorySlice";

function Footer() {
    const categories = useSelector(selectCategoryList);

    return (
        <div className="footer-container">
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-lg-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left mr-auto">
                            <div class="footer-widget">
                                <h4 class="mb-4">Pet-Shop
                                <li class="list-inline-item">
                                            <a href="https://github.com/DanielIbrahim1/Final_project">
                                                <img className="footer-icon" src="http://127.0.0.1:8000/static/images/gitHub.jpeg"></img>
                                            </a></li> </h4>

                                <p class="lead">Developed by :
                                    <div class="col-lg-8">Daniel ibrahim
                                        <a href="https://www.linkedin.com/in/daniel-ibrahim-ba08b3226/">
                                            <img className="footer-icon" src="http://127.0.0.1:8000/static/images/linkedIn.jpeg"></img>
                                        </a>

                                       

                                    </div>
                                    <div class="col-lg-8">Roy abramovich<li class="list-inline-item">
                                        <a href="https://www.linkedin.com/in/roy-abramovich-440b25152/">
                                            <img className="footer-icon" src="http://127.0.0.1:8000/static/images/linkedIn.jpeg"></img>
                                        </a></li>
                                    </div> </p>
                                    
                                    <div class="col-lg-10">
                            <p class="copyright mb-0 ">@ Copyright Reserved to Daniel & Roy</p>
                        </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
                            <div class="footer-widget">
                                <h4 class="mb-4">Category</h4>
                                <ul class="pl-0 list-unstyled mb-0">

                                    <li><Link to="/">All products</Link></li>
                                    <li>{categories.map((cat) => <Link key={cat._id} to={`/${cat._id}`}><li> {cat.name}</li></Link>)}</li>
                                    {/* Category loop */}
                                </ul>
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
                            <div class="footer-widget">
                                <h4 class="mb-4">Contact Us</h4>
                                <ul class="pl-0 list-unstyled mb-0">
                                    <li>danielibrahim48@gmail.com</li>
                                    <li>roy.ab27@gmail.com</li>
                                </ul>
                            </div>
                        </div>
                        {/* mmm.. maybe not a useful lins  */}
                        <ul></ul>

                        <div class="col-md-6 col-lg-3 col-sm-6 text-center text-sm-left">
                            <div class="footer-widget">
                                <h4 class="mb-4">Opening Hours</h4>
                                <ul class="pl-0 list-unstyled mb-5">
                                    <li class="d-lg-flex justify-content-between">Monday-Friday <span>8.00-20.00</span></li>
                                    <li class="d-lg-flex justify-content-between">Saturday <span>10.00-20.00</span></li>
                                    <li class="d-lg-flex justify-content-between">Sunday <span>12-20.00</span></li>
                                </ul>
                                {/* necessary? */}

                                <h5>Call Now : +(000) 000-000</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


            {/* <div class="footer-btm py-4 ">
                <div class="container">
                    <div class="row ">
                        <div class="col-lg-6">
                            <p class="copyright mb-0 ">@ Copyright Reserved to Daniel & Roy</p>
                        </div>
                        <div class="col-lg-6">
                            <ul class="list-inline mb-0 footer-btm-links text-lg-right mt-2 mt-lg-0">
                                <li class="list-inline-item">
                                    <a href="https://www.linkedin.com/in/daniel-ibrahim-ba08b3226/">
                                        D.I
                                        <br></br>
                                        <img className="footer-icon" src="http://127.0.0.1:8000/static/images/linkedIn.jpeg"></img>
                                    </a></li>
                                <li class="list-inline-item">
                                    <a href="https://www.linkedin.com/in/roy-abramovich-440b25152/">
                                        R.A
                                        <br></br>
                                        <img className="footer-icon" src="http://127.0.0.1:8000/static/images/linkedIn.jpeg"></img>
                                    </a></li>

                                <li class="list-inline-item">
                                     <a href="https://github.com/DanielIbrahim1/Final_project">
                                    <img className="footer-icon" src="http://127.0.0.1:8000/static/images/gitHub.jpeg"></img>
                                </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
export default Footer;