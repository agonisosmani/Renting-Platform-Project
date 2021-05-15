import React from 'react';

import './about.css';

export default function about(props) {
    return (
       <div className="about_container" id="select2-drop">
            <div className="image">
                <img src={'/fotot/about.jpg'} alt="About Page" />
            </div>
            <div className="second_part">
                <h1 className="elementor-heading-title text-center">Your Peer-To-Peer Rental Marketplace</h1>
            </div>
            <div className="elementor-element">
                <div className="elementor-widget-container">
                    <div className="elemtor-text-editor">
                        <p className="text-center about_paragraph"><strong>Buy Less.Experience More.</strong></p>
                        <p className="text-center about_paragraph">
                            <span className="about_span">Founded in Ottawa, Canada,</span> 
                            <span className="about_span">in 2018 with a dream to change the world, Ruckify’s rent anything marketplace provides an accessible platform for everyone to use. Having built driving technology and forward-thinking leaders, Ruckify has paved the way for peer-to-peer sharing in building and established communities.&nbsp;</span> 
                        </p>
                        <p className="text-center about_paragraph">
                            <span className="about_span">This tool allows the ordinary person to generate an income from virtually nothing, and the established company to grow into new audiences and target markets. One small application gives the power to share more than items, but experiences, passions, and the potential to build a global community that can make a tourist feel at home when oceans away.&nbsp;</span>
                        </p>
                        <p className="text-center about_paragraph">
                            <span className="about_span">Ruckify provides its users with the freedom to do what they want when they want without the restriction of time, storage, price, and availability. While also encouraging sustainability by reusing items throughout the community without having to buy new or throw away the neglected. Ruckify gives you an opportunity to make a real difference while obtaining financial security and confidence in your entrepreneurial instincts.</span>
                        </p>
                        <p className="text-center about_paragraph">
                            <span className="register-elemtor about_span">Register for our live</span>
                            <span className="about_span"> to learn more about making money!</span>
                        </p>
                    </div>
                </div>
            </div>
       </div>
    )
}