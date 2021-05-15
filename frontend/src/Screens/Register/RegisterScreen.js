import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registeer } from '../../actions/userActions';
import { useForm } from 'react-hook-form'; // LIBRARI PER VALIDIM TE INPUTEVE NE FUNCTION COMPONENTS

import './register.css';

export default function Register(props) {

    const { register, handleSubmit, errors } = useForm({  // LIBRARI PER VALIDIM TE INPUTEVE NE FUNCTION COMPONENTS
        mode: "onBlur",
        reValidateMode: "onChange" //keta dy rreshta kod(11,12) -> sepse po dojm validimi me vlejt edhe n onChange
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userRegister = useSelector(state => state.userRegister); //sepse tek combineReducers e kemi lan userRegister
    const { loading, userInfo, error } = userRegister; //po i thojm merre loading prej reducers sepse tek reducers i kemi keto state loading, userInfo, error etj permes useSelector qasemi ne te dhena, kjo useSelector osht njejt sikur mapStateToProps dhe connect

    const dispatchMethod = useDispatch();

    const submitHandler = () => {
        dispatchMethod(registeer(name,email,password));
    }

    useEffect(() => {
        if(userInfo) {
           props.history.push('/confirm-email');
        }
    }, [userInfo])

    return (
        <div className="container" id="register_container">
            <div className="row" id="select2-drop">
                <div className="col-12 col-md-10 col-lg-7 px-0 login_centeer">
                    <div className="login-header mb-5">
                        <div className="login-overlay"></div>
                    </div>
                    <div className="px-3">
                       <p className="text-center login_paragraf">Regjistrohu me email</p>
                       {error ? <p className="text-danger text-center mb-4">{error}</p> : ''}
                        <div className="row mb-4">
                            <div className="col-12">
                                <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="form-group">
                                        <div className="input-group">
                                            <input 
                                                type="text" 
                                                name="name"
                                                className="form-control login-inputs" 
                                                placeholder="Emri" 
                                                autoComplete="of"
                                                onChange={(e) => setName(e.target.value)}
                                                ref={register({ required: true })}
                                            />
                                        </div>
                                        <span className="text-danger">{errors.name && 'Fusha Emrit duhet plotësuar'}</span>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input 
                                                type="text" 
                                                name="email"
                                                className="form-control login-inputs" 
                                                placeholder="E-maili" 
                                                autoComplete="of"
                                                onChange={(e) => setEmail(e.target.value)}
                                                ref={register({
                                                    required: "Fusha Email-it duhet plotësuar",
                                                    pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Email-i nuk është valid"
                                                    }
                                                })}
                                            />
                                        </div>
                                        <span className="text-danger">{errors.email && errors.email.message}</span>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input 
                                                type="password" 
                                                name="password"
                                                className="form-control login-inputs" 
                                                placeholder="Fjalëkalimi" 
                                                onChange={(e) => setPassword(e.target.value)}
                                                ref={register({ required: true })}
                                            />
                                        </div>
                                        <span className="text-danger">{errors.password && 'Fusha Fjalëkalimi-it duhet plotësuar'}</span>
                                    </div>
                                    <button type="submit" id="login_btn" className="btn btn-primary btn-block w-100 text-white">Regjistrohu</button>
                                </form>
                            </div>
                            <div className="col-12 text-center mt-4">
                                <span className="mr-2 text-dark h6 font-weight-normal font-italic">Keni llogari?</span>
                                <Link to="/login"><span className="text-primary-link h5">Kyçu</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}