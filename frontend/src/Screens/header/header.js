import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/userActions';
// import { withRouter } from "react-router"; //sepse Header nuk eshte brenda <Routes /> e nuk kemi qasje ne router this.props.history.push qet error e prandaj duhet me perdor withRouter qe me ja mundesi qe edhe headeri me pas qasje ne router.

import { FaUserAlt } from 'react-icons/fa';
import './header.css';

class Header extends Component {
    
    showMenu = () => {
        document.querySelector(".slidemenu").classList.add("open");
        document.querySelector(".menu").style.display = "none"; //sepse nese nuk e fshij klasen menu ather po mbet kjo ikona e gjelbert e hamburgerit (me vija e po doket pa lidhje prandaj ktu duhet me fshi  ekur te mbyllin at dritaren e shfaqim prap -rreshti 21)
    }
    hideMenu = () => {
        document.querySelector(".slidemenu").classList.remove("open");
        document.querySelector(".menu").style.display = "block";
    }

    handleLogout = () => {
        this.props.dispatch(logout());
    }

    render() {
        return (
            <header id="header">
                <nav className="navbar-light" id="nav">
                    <div id="collapse">
                        {/* d-lg-none -> i bjen qe kur deri ne large me kon none tani shfaqet */}
                        
                        <div className="header menu-md">
                            <div className="left">
                                <Link to="/"><img src="../../fotot/logotransparent.png" className="logo img-fluid" alt="Logo" /></Link>
                            </div>
                            <div className="menu d-lg-none">
                                <span className="menu_span_text">Menu</span>
                                <div className="hamburger" onClick={this.showMenu}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                               
                            </div>
                            <div className="right">
                                <Link to={ this.props.userSignIn.userInfo ? '/regjistroni-shpallje' : '/login'}><button className="posto_shpallje">Posto shpallje</button></Link>
                                { this.props.userSignIn.userInfo ? 
                                    <Link to="/profili"><button className="register">Shpalljet Tuaja</button></Link>
                                    : ''
                                }
                                {
                                    this.props.userSignIn.userInfo && this.props.userSignIn.userInfo.isAdmin ? 
                                    <Link to="/admin-paneli"> 
                                        <button className="register">
                                            Admin Paneli
                                        </button>
                                    </Link> : ''
                                }
                                { this.props.userSignIn.userInfo ? '' : <Link to="/register"><button className="register">Regjistrohuni</button></Link> }   
                                { this.props.userSignIn.userInfo ? 
                                    <div className="dropdown-out">
                                        <FaUserAlt id="out-icon" style={{color: '#666666'}} />
                                        <div className="dropdown-content-out">
                                            <Link to="/profili">Profili</Link>
                                            <Link to="/" title="logout" onClick={this.handleLogout}>Largohu</Link>
                                        </div>
                                    </div> 
                                    : 
                                    <Link to="/login"><button className="Llogaria">Llogaria</button></Link>  
                                }
                                
                               
                            </div>
                        </div>
                        <hr />
                        <div className="header_bottom menu-md">
                            <div className="header_bottom_first">
                                
                                <ul className="ul_list_header">
                                    <Link to="/shpalljet"><li>Shiko Shpallje</li></Link>
                                    <div className="dropdown">
                                        <Link to="/"><li>Si të ofroni/postoni produkte</li></Link>
                                        <div className="dropdown-content">
                                            <Link to="/how-to-post">How to Post</Link>
                                            <Link to="/how-to-rent">How to Rent</Link>
                                        </div>
                                    </div>
                                    <Link to="/contact"><li>Kontakti</li></Link>
                                    <Link to="/nuk-keni-gjetur-produktin"><li>Nuk keni gjetur akoma produktin?</li></Link>
                                    <Link to="/about"><li>Rreth nesh</li></Link>
                                </ul>
                               
                            </div>
                        </div>
                    </div>
                    <div className="slidemenu" id="slidemenu" ref="slidemenu">
                        <div className="close">
                            <button id="close"><i className="fas fa-times" onClick={this.hideMenu}></i></button>

                        </div>
                        
                        <li>
                            <Link to={ this.props.userSignIn.userInfo ? '/regjistroni-shpallje' : '/login'} onClick={this.hideMenu}>Posto shpallje</Link>
                        </li>
                      
                        <li>
                            <Link to="/shpalljet" onClick={this.hideMenu}>Shiko Shpallje</Link>
                        </li>
                        <li>
                            <Link to="/how-to-post" onClick={this.hideMenu}>Si të postoni produkte</Link>
                        </li>
                        <li>
                            <Link to="/how-to-rent" onClick={this.hideMenu}>Si të ofroni produkte</Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={this.hideMenu}>Rreth nesh</Link>
                        </li>

                        <li>
                            <Link to="/contact" onClick={this.hideMenu}>Kontakti</Link>
                        </li>
                      
                        <li>
                            <Link to="/nuk-keni-gjetur-produktin" onClick={this.hideMenu}>Nuk keni gjetur akoma produktin</Link>
                        </li>  
                      
                        { this.props.userSignIn.userInfo ? <li>
                            <Link to="/profili" onClick={this.hideMenu}>Shpalljet Tuaja</Link> 
                            </li> : ''
                        }
                        {
                            this.props.userSignIn.userInfo && this.props.userSignIn.userInfo.isAdmin ? <li>
                                <Link to="/admin-paneli"  onClick={this.hideMenu}>Admin Paneli</Link>
                            </li> : ''
                        }
                        { this.props.userSignIn.userInfo ? <li> 
                            <Link to="/" title="logout" onClick={this.handleLogout}>Largohu</Link> </li> 
                            :
                            <li>
                                <Link to="/login" onClick={this.hideMenu}>Llogaria</Link>
                            </li>
                        }
                    </div>
                </nav>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return { 
        userSignIn: state.userSignIn
    }
}

export default connect(mapStateToProps) (Header);