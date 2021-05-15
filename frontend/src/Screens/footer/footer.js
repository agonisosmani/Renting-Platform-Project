import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

export default function Footer() {
    return (
        <footer className="footer-static">
           <div className="ruckify-container">
               <div className="row">
                   <div className="col-md-8">
                       <div className="row">
                           <div className="col-md-4 footer-links-head">
                               <p className="h5 footer-links-title">Company</p>
                               <ul className="footer-links">
                                   <li><Link to="/about">About</Link></li>
                                   <li><Link to="/contact">Kontakti</Link></li>
                                   <li><Link to="/">Blog</Link></li>
                               </ul>
                           </div>
                           <div className="col-md-4 footer-links-head">
                               <p className="h5 footer-links-title">How To</p>
                               <ul className="footer-links">
                                   <li><Link to="/how-to-rent">How to Rent</Link></li>
                                   <li><Link to="/how-to-post">How to Post</Link></li>
                                   <li><Link to="/">Rent Store</Link></li>
                               </ul>
                           </div>
                           <div className="col-md-4 footer-links-head">
                               <p className="h5 footer-links-title">Policies</p>
                               <ul className="footer-links">
                                   <li><Link to="/">Terms</Link></li>
                                   <li><Link to="/">Privacy Policy</Link></li>
                                   <li><Link to="/">Insuarane Policy</Link></li>
                               </ul>
                           </div>
                       </div>
                   </div>
                   <div className="col-md-4">
                        <Link to="/"><img src="../../fotot/horizontal_logo.jpg" className="img-fluid rent-gjithqka-icon mt-lg-0" alt="Logo" /></Link>
                        <a href="#" className="mt-2 mb-1 d-block">+1 880 876 9287</a>
                        <a href="#" className="mb-3 d-block">rentgjithqka@info.com</a>
                        <div className="social-media d-flex mt-2 mb-2"  id="socialmedia_footer">
                           
                            <li><a href="#"><i className="fab fa-tumblr" title="Tumblr"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter" title="Twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-facebook-f" title="Facebook"></i></a></li>
                        </div>
                   </div>
               </div>
               <hr />
               <div className="row bottom-footer">
                   <div className="col-md-4 col-sm-12">
                       <p className="text-md-left text-center">© {new Date().getFullYear()} All Rights Reserved.</p>
                   </div>
                   <div className="col-md-8 col-sm-12"></div>
               </div>
           </div>
       </footer> 
    )
}