import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { details, editShpallja } from '../../actions/shpalljaActions';
import moment from 'moment-js';
import util from '../../util';

import './add_screen.css';

function AprovoScreen(props) {

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    const shpalljaDetails = useSelector(state => state.shpalljaDetails);
    const { loading, shpallja, error } = shpalljaDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/profile po tek logini, e di a jom i logum permes userInfo(cookie pra)
          props.history.push("/signin");
        }
        if(userInfo && !userInfo.isAdmin) {
            props.history.push('/notfound');
        }
        dispatch(details(props.match.params.id));
        return () => {
        };
    }, []);

    const editHandler = () => {
        dispatch(editShpallja(props.match.params.id));
    }

    return (
        <div>
            { loading ? <div className="loader"></div>  : ''}
            { error ? <span className="text-danger text-center alert-general">{error}</span> : ''}
            {shpallja ? 
            <div className="container pt-5 pb-5 bg-light" id="select2-drop">
                <div className="row">
                    <div className=" col-sm-12 col-md-6 d-flex justify-content-center">
                        <div className="imgbox">
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="3000">
                                    <ol className="carousel-indicators">
                                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                        {shpallja.images.filter((image => image !== shpallja.images[0])).map((image, index) => {
                                            return (
                                                <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index}></li>

                                            )
                                        })}
                                    </ol>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img className="d-block w-100 details_img" src={shpallja.images[0]} alt="First slide" />
                                        </div>
                                        {/* eshte dasht me bo kshtu sepse na nuk e dim sa foto kan me u bo upload per nje shpallje munden me qen psh max 6, por mundemi mos me pas hiq ose me pas 1 e tash duhet veq 1 slider aty me shfaq e prandaj iterojm kshtu, images[0] e kom lan sepse carousel nga bootstrap i duhet klasa active pa to sbon e foton e par e kom lan me renditje t paren,e tash mos me ma qit edhe niher kur t iteroj duhet me filter kshtu me bo */}
                                        {shpallja.images.filter((image => image !== shpallja.images[0])).map((i, key) => {
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
                        <h2 className="text-center details_h3">{shpallja.title}</h2>
                        <div className="d-flex justify-content-start">
                            <p className="pl-3"><strong>Publikuar nga:</strong>{shpallja.name}</p>
                        </div>
                        <div className="qmimi d-flex justify-content-start">
                            <p className="pl-3">
                                <strong>Email:</strong>{shpallja.email}
                            </p>
                        </div>
                        <div className="size d-flex justify-content-start">
                            <p className="pl-3">
                                <strong>Tel:</strong>{util.formatPhoneNumber(shpallja.telephone)}
                            </p>
                        </div>
            
                        <div className="quantity d-flex justify-content-start">
                            <p className="pl-3">
                                <strong>Kategoria:</strong>{shpallja.category}
                            </p>
                        </div>

                        <div className="quantity d-flex justify-content-start">
                            <p className="pl-3">
                                <strong>Komuna:</strong>{shpallja.komuna}
                            </p>
                        </div>

                        <div className="quantity d-flex justify-content-start">
                            <p className="pl-3">
                                <strong>Publikuar:</strong>{moment(shpallja.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                            </p>
                        </div>
            
                        <div className="description d-flex justify-content-start">
                            <p className="pl-3">
                                <strong>Përshkrimi:</strong>{shpallja.description}
                            </p>
                        </div>

                        <div className="quantity d-flex justify-content-start">
                            <p className="pl-3">
                                <strong>Çmimi:€</strong>{shpallja.price}
                            </p>
                        </div>

                        <div className="quantity d-flex justify-content-start">
                            <p className="pl-3">
                                <strong>Aprovuar:</strong>
                                {shpallja.isApproved ? 'Po' : 'Jo'}
                            </p>
                        </div>

                        <div className="goback">
                            {shpallja.isApproved === false ?
                                <Link to="/lista-shpalljeve" onClick={editHandler} className="details-button mt-4 ml-3 btn btn-block text-center btn-outline-dark btn-md pl-0 pr-0 ">Aprovo</Link>
                            : <Link to="/lista-shpalljeve" className="details-button mt-4 ml-3 btn btn-block text-center btn-outline-dark btn-md pl-0 pr-0 ">Kthehu</Link>
                            }
                        </div>
                    </div>
                </div>
            </div> : ''}
        </div>
    )
}

export default AprovoScreen;