import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // LIBRARI PER VALIDIM TE INPUTEVE NE FUNCTION COMPONENTS

import './register.css';

const RegisterAdmin = (props) => {

  const { register, handleSubmit, errors } = useForm({  // LIBRARI PER VALIDIM TE INPUTEVE NE FUNCTION COMPONENTS
    mode: "onBlur",
    reValidateMode: "onChange" //keta dy rreshta kod(11,12) -> sepse po dojm validimi me vlejt edhe n onChange
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

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
  }, []);

  const submitHandler = () => {
    axios.post('http://localhost:5000/api/users/createAdmin', {name, email, password, isAdmin});
    props.history.push('/confirm-email');
  
  }

  return (
    <div className="container" id="register_container">
      <div className="row" id="select2-drop">
          <div className="col-12 col-md-10 col-lg-7 px-0 login_centeer">
            <div className="login-header mb-5">
                <div className="login-overlay"></div>
            </div>
            <div className="px-3">
                <p className="text-center login_paragraf">Register New Admin</p>
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
                                          placeholder="Email-i" 
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
                              <div className="form-group">
                                <select
                                    className="custom-select role-selectt"
                                    name="isAdmin"
                                    value={isAdmin}
                                    onChange={(e) => setIsAdmin(true)}
                                    ref={register({ required: true })}
                                  >
                                    <option value="">Selekto rolin</option>
                                    <option value="true">Admin</option>
                                </select>
                                <span className="text-danger">{errors.isAdmin && 'Fusha Rolit duhet plotësuar'}</span>
                              </div>
                              <button type="submit" id="login_btn" className="btn btn-primary btn-block w-100 text-white">Regjistro</button>
                          </form>
                      </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
};

export default RegisterAdmin;
