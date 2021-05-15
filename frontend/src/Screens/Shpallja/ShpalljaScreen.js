import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { details, rateShpallja } from '../../actions/shpalljaActions';
import moment from 'moment-js';
import util from '../../util';
import ReactStars from "react-rating-stars-component";

import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';

import './shpallja.css';

class ShpalljaDetails extends Component {

    ratingStars = {
        size: 40,
        count: 5,
        color: "black",
        activeColor: "yellow",
        value: 0,
        a11y: true,
        isHalf: true,
        emptyIcon: <AiOutlineStar />,
        halfIcon: <BsStarHalf />,
        filledIcon: <AiFillStar />,
        onChange: (rating) => {
            this.props.dispatch(rateShpallja(this.props.match.params.id, rating));
        }
    };

    componentWillMount() {
        this.props.dispatch(details(this.props.match.params.id));
    }

    render() {
        return (
            <div  id="select2-drop">
                { this.props.shpalljaDetails.loading ? <div className="loader"></div>  : ''}
                { this.props.shpalljaDetails.error ? <span className="text-danger text-center alert-general">{this.props.shpalljaDetails.error}</span> : ''}
                {this.props.shpalljaDetails.shpallja ? 
                <div className="container pt-5 pb-5 bg-light">
                    <div className="row">
                        <div className=" col-sm-12 col-md-6 d-flex justify-content-center">
                            <div className="imgbox">
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="3000">
                                        <ol className="carousel-indicators">
                                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                            {this.props.shpalljaDetails.shpallja.images.filter((image => image !== this.props.shpalljaDetails.shpallja.images[0])).map((image, index) => {
                                                return (
                                                    <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index}></li>

                                                )
                                            })}
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img className="d-block w-100 details_img" src={this.props.shpalljaDetails.shpallja.images[0]} alt="First slide" />
                                            </div>
                                            {/* eshte dasht me bo kshtu sepse na nuk e dim sa foto kan me u bo upload per nje shpallje munden me qen psh max 6, por mundemi mos me pas hiq ose me pas 1 e tash duhet veq 1 slider aty me shfaq e prandaj iterojm kshtu, images[0] e kom lan sepse carousel nga bootstrap i duhet klasa active pa to sbon e foton e par e kom lan me renditje t paren,e tash mos me ma qit edhe niher kur t iteroj duhet me filter kshtu me bo */}
                                            {this.props.shpalljaDetails.shpallja.images.filter((image => image !== this.props.shpalljaDetails.shpallja.images[0])).map((i, key) => {
                                                return (                    
                                                    <div className="carousel-item" key={key}>
                                                        <img className="d-block details_img w-100" src={i} alt="Second slide" />
                                                    </div>
                                                
                                                )
                                            })}
                                        </div>
                                         
                                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                            </div>
                        </div>
                
                        <div className="col-sm-12 col-md-6 ">
                            <h2 className="text-center details_h3">{this.props.shpalljaDetails.shpallja.title}</h2>
                            <div className="d-flex justify-content-start">
                                <p className="pl-3"><strong>Publikuar nga:</strong>{this.props.shpalljaDetails.shpallja.name}</p>
                            </div>
                            <div className="qmimi d-flex justify-content-start">
                                <p className="pl-3">
                                    <strong>Email:</strong>{this.props.shpalljaDetails.shpallja.email}
                                </p>
                            </div>
                            <div className="size d-flex justify-content-start">
                                <p className="pl-3">
                                    <strong>Tel:</strong>{util.formatPhoneNumber(this.props.shpalljaDetails.shpallja.telephone)}
                                </p>
                            </div>
                
                            <div className="quantity d-flex justify-content-start">
                                <p className="pl-3">
                                    <strong>Kategoria:</strong>{this.props.shpalljaDetails.shpallja.category}
                                </p>
                            </div>

                            <div className="quantity d-flex justify-content-start">
                                <p className="pl-3">
                                    <strong>Komuna:</strong>{this.props.shpalljaDetails.shpallja.komuna}
                                </p>
                            </div>

                            <div className="quantity d-flex justify-content-start">
                                <p className="pl-3">
                                    <strong>Publikuar:</strong>{moment(this.props.shpalljaDetails.shpallja.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                </p>
                            </div>
                
                            <div className="description d-flex justify-content-start">
                                <p className="pl-3">
                                    <strong>Përshkrimi:</strong>{this.props.shpalljaDetails.shpallja.description}
                                </p>
                            </div>

                            <div className="quantity d-flex justify-content-start">
                                <p className="pl-3">
                                    <strong>Çmimi:€</strong>{this.props.shpalljaDetails.shpallja.price}
                                </p>
                            </div>
                            
                            <ReactStars {...this.ratingStars} />

                            <div className="goback">
                                <Link to="/shpalljet" className="details-button mt-4 ml-3 btn btn-block text-center btn-outline-dark btn-md pl-0 pr-0 ">Kthehu</Link>
                            </div>
                        </div>
                    </div>
                </div> : ''}
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        shpalljaDetails: state.shpalljaDetails
    }
}

export default connect(mapStateToProps) (ShpalljaDetails);