import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'; // LIBRARI PER VALIDIM TE INPUTEVE NE FUNCTION COMPONENTS

import './login.css';

export default function Login(props) {

    const { register, handleSubmit, errors } = useForm({  // LIBRARI PER VALIDIM TE INPUTEVE NE FUNCTION COMPONENTS
        mode: "onBlur",
        reValidateMode: "onChange" //keta dy rreshta kod(11,12) -> sepse po dojm validimi me vlejt edhe n onChange
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignIn = useSelector(state => state.userSignIn); //sepse tek combineReducers e kemi lan userSignIn
    const { loading, userInfo, error } = userSignIn;
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'; //[1] sepse e kemi psh redirect=shipping kjo e ndan ku ka barazim -> [redirect, shipping] -> e shipping pra osht ne poziten 1 [1]
    const dispatchMethod = useDispatch();

    const submitHandler = () => {
        // event.preventDefault(); //ska nevoj sepse react-hook-form tash perkujdeset per kete.
        dispatchMethod(signin(email,password));
    }

    useEffect(() => {
        if(userInfo) {
           props.history.push(redirect);
        }
    }, [userInfo])

    return (
        <div className="container" id="login_container">
            <div className="row" id="select2-drop">
                <div className="col-12 col-md-10 col-lg-7 px-0 login_centeer">
                    <div className="login-header mb-5">
                        <div className="login-overlay"></div>
                    </div>
                    <div className="px-3">
                       <p className="text-center login_paragraf">Kyçu me email</p>
                       {error ? <p className="text-danger text-center mb-4">{error}</p> : ''}
                        <div className="row mb-4">
                            <div className="col-12">
                                <form onSubmit={handleSubmit(submitHandler)}>
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
                                    <button type="submit" id="login_btn" className="btn btn-primary btn-block w-100 text-white">Kyçu</button>
                                </form>
                            </div>
                            <div className="col-12 text-center mt-4">
                                <span className="mr-2 text-dark h6 font-weight-normal font-italic">Nuk keni llogari?</span>
                                <Link to="/register"><span className="text-primary-link h5">Regjistrohu</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}