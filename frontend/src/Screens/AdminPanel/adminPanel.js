import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './admin_panel.css';

const PanelScreen = (props) => {

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/profile po tek logini, e di a jom i logum permes userInfo(cookie pra)
            props.history.push("/login");
        }
        if(userInfo && !userInfo.isAdmin) {
            props.history.push('/notfound');
        }
        return () => {};
    }, [])

    return (
        <div id="AdminPanel">
            <div className=" container pt-5">
                <h1 className="text-center text-secondary admin_panel_title pb-3">Admin panel</h1>
                <hr />
                <div className="row" id="select2-drop">
                    <div className="col-sm-12 col-md-8 pt-5 " style={{margin: '0 auto'}}>
                        <Link to="/krijo-kategorin" className="btn admin_panel_btn">Shto Kategori</Link>
                        <Link to="/krijo-komunën" className="btn admin_panel_btn">Shto Komunën</Link>
                        <Link to="/krijo-member_reviews" className="btn admin_panel_btn">Shto Member Reviews</Link>
                        <Link className="btn admin_panel_btn" to="/lista-shpalljeve">Lista e Shpalljeve</Link>
                        <Link className="btn admin_panel_btn" to="/lista-përdoruesve">Lista e Përdoruesve</Link>
                        <Link className="btn admin_panel_btn" to="/lista-komunave">Lista e Komunave</Link>
                        <Link className="btn admin_panel_btn" to="/lista-kontakteve">Lista e Kontakteve</Link>
                        <Link className="btn admin_panel_btn" to="/lista-mesazheve">Lista e Mesazheve</Link>
                        <Link className="btn admin_panel_btn" to="/lista-member-reviews">Lista e Members Reviews</Link>
                        <Link className="btn admin_panel_btn" to="/regjistro-admin">Register New Admin</Link>
                        <Link className="btn admin_panel_btn" to="/lista-kategorive">Fshijë Kategorin</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PanelScreen;