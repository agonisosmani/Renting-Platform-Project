import React from 'react';
import { Link } from 'react-router-dom';
import './post_rent.css';

export default function Post(props) {
    return (
        <div className="post_container" id="select2-drop">
            <div className="image">
                <img src={'./fotot/Artboard-–-57.jpg'} />
            </div>
            <section className="elementor-section">
                <div className="elementor-container">
                    <div className="elementor-row">
                        <div className="elementor-column">
                            <div className="elementor-column-wrap">
                                <div className="elementor-widget-wrap">
                                    <div className="elementor-element-22">
                                        <div className="elementor-widget-container">
                                            <h1 className="elementor-title">
                                                <span className="elementor-heading-title post_rent_span">Start Your Ruckify Side-Hustle</span>
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="elementor-element-23">
                                        <div className="elementor-widget-container">
                                            <div className="elementor-text-editor">
                                                <p className="left_paragraph">
                                                    <span className="post_rent_span">Ruckify has created a&nbsp;</span>
                                                    <span className="post_rent_span">convenient</span>
                                                    <span className="post_rent_span">way for people to start their own side-hustle from the comfort of their home. To do this, you post items sitting around your house for people in your community to rent! Not only does this help people in your community and put extra money in your pocket, but it helps the</span>
                                                    <span className="post_rent_span">environment</span>
                                                    <span className="post_rent_span">&nbsp; as well by giving people the opportunity to rent instead of buy. Every item rented is spared from being&nbsp;</span>
                                                    <span className="post_rent_span">bought and ultimately ending up in a landfill. </span>
                                                </p>
                                                <p className="left_paragraph">
                                                    To assist with the current COVID-19 crisis, we offer a touchless delivery service called <span className="ruckify_express">RuckifyExpress</span>.The driver will pick-up, further disinfect and drop-off your item to the renter, as well as return it to you. We are encouraging everyone to take extra care disinfecting their items prior to renting them or returning them.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="elementor-element-24">
                                        <div className="elementor-widget-container">
                                            <div className="elementor-button-wrapper">
                                                <Link to="/register" className="elementor-button">Register</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="elementor-element-25">
                                        <div className="elementor-widget-container">
                                            <h3 className="elementor-titlee">How To Start Posting</h3>
                                        </div>
                                    </div>
                                    <div className="elementor-element-26">
                                        <div className="elementor-widget-container">
                                            <div className="elementor-text-editor">
                                                <p>
                                                    <strong>Post</strong>
                                                </p>
                                                <p><span className="post_rent_span">Upload photos and set your description, pricing and location for free.</span></p>
                                                <p>
                                                    <strong>Validate</strong>
                                                </p>
                                                <p>
                                                    <span className="post_rent_span">Accept incoming booking and respond to incoming messages.</span>
                                                </p>
                                                <p>
                                                    <strong>Share</strong>
                                                </p>
                                                <p>
                                                    <span className="post_rent_span">Arrange a convenient time and place to exchange your item with the Renter.</span>
                                                </p>
                                                <p>
                                                    <strong>Collect</strong>
                                                </p>
                                                <p>
                                                    <span className="post_rent_span">Once your item is returned, get paid via our secure payment processor.</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
       </div>
    )
}