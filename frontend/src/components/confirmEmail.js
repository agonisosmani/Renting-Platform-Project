import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ConfirmEmailScreen(props) {

    const userRegister = useSelector(state => state.userRegister); //sepse tek combineReducers e kemi lan userSignIn
    const { userInfo } = userRegister;

    useEffect(() => {
        // if(!userInfo) {
        //     props.history.push('/notfound');
        // }
    }, [])

    return (
        <div style={{paddingBottom: '100px', paddingTop: '135px'}} id="verifiko-email">
            <div className="row bootstrap snippets bootdeys" id="select2-drop" style={{marginRight: '0px', marginLeft: '0px'}}>
                <div className="col-md-5 col-md-offset-3" style={{margin: '0 auto'}}>
                    <div className="text-center logo-alt-box">
                        <Link to="/" className="logo" style={{float: 'none', color: '#5c7cfa', fontSize: '24px', letterSpacing: '.06em', lineHeight: '46px' }}>
                            <span>rent.com</span>
                        </Link>
                    </div>
                    <div className="m-t-30 card-box" style={{marginBottom: '20px', backgroundClip: 'padding-box', borderRadius: '5px', padding: '20px', backgroundColor: '#ffffff', boxShadow: '0 8px 42px 0 rgba(0, 0, 0, 0.08)' }}>
                        <div className="text-center">
                            <h5 className="text-uppercase font-bold m-b-0 verifiko-email">Verifiko Emailin</h5>
                        </div>
                        <div className="panel-body text-center">
                            <i className="far fa-envelope" style={{fontSize: '50px', color: '#5c7cfa'}}><span className="badge badge-primary badge-email-confirmation">1</span></i>
                            <p className="text-muted text-color-email font-13 m-t-20" style={{color:  '#9a9da0' }}> 
                                Kemi dërguar një email konfirmimi në <b>{userInfo ? userInfo.email : ''}</b>. Për të vazhduar tutje, ju lutem kontrolloni emailin tuaj dhe verifikoni email adresën.  
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}