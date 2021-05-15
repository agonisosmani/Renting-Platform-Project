import React from 'react';
import './post_rent.css';

export default function Rent(props) {
    return (
        <div className="rent_container" id="select2-drop">
            <div className="image">
                <img src={'./fotot/looking.jpg'} />
            </div>
            <section className="elementor-section">
                <div className="elementor-container">
                    <div className="elementor-row">
                        <div className="elementor-column">
                            <div className="elementor-column-wrap">
                                <div className="elementor-widget-wrap">
                                    <div className="elementor-element-25">
                                        <div className="elementor-widget-container">
                                            <h3 className="elementor-titlee">How To Rent On Ruckify</h3>
                                        </div>
                                    </div>
                                    <div className="elementor-element-26">
                                        <div className="elementor-widget-container">
                                            <div className="elementor-text-editor">
                                                <p>
                                                    <strong>Discover</strong>
                                                </p>
                                                <p><span className="post_rent_span">Find what you’re looking for in the Ruckify Marketplace.</span></p>
                                                <p>
                                                    <strong>Request</strong>
                                                </p>
                                                <p>
                                                    <span className="post_rent_span">After a quick verification, book the item for your chosen dates. </span>
                                                </p>
                                                <p>
                                                    <strong>Experience</strong>
                                                </p>
                                                <p>
                                                    <span className="post_rent_span">Arrange collection with the Poster, before enjoying your item.</span>
                                                </p>
                                                <p>
                                                    <strong>Return</strong>
                                                </p>
                                                <p>
                                                    <span className="post_rent_span">Return the item to the Poster and leave them a meaningful review to improve our community.</span>
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