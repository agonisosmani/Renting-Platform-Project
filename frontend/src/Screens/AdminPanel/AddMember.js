import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form'; // LIBRARI PER VALIDIM TE INPUTEVE NE FUNCTION COMPONENTS
import * as Toastr from 'toastr';
import 'toastr/build/toastr.css';

import './add_screen.css';

export default function AddMember(props) {
    const { register, reset, handleSubmit, errors } = useForm({});

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
 
    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/krijo-kategorin po tek logini, e di a jom i logum permes userInfo(cookie pra)
            props.history.push("/login");
        }
        if(userInfo && !userInfo.isAdmin) {
            props.history.push('/notfound');
        }  
    
        return () => {
          //
        };
    }, []);

    const submitHandler = (e) => {
        axios.post('https://backendpostomerr.herokuapp.com/api/members', {name, description}, {
            headers: {
              Authorization: 'Bearer ' + userInfo.token
            }
          }).then(res => {
            console.log(res.data)
            if(res.data.success) {  
                // reset({name: '', email: '', telephone: '', category:'', komuna: '', title: '', description: '', price: '', images: ''}); // reset after form submit
                Toastr.success('Member Review u krijua me sukses.');  
                props.history.push('/admin-paneli');
            } else {
                Toastr.error('Member nuk u postua.Provo përsëri.');
            }
        })
    }

    return (
            <div id="shto_shpalljen">
                <div className="container" id="select2-drop">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-10 mt-3 pb-2">
                        <h3 className="text-center text-secondary pb-2">Krijo Member Reviews</h3>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="name"
                                    className="form-control add_shpalljen" 
                                    placeholder="Emri" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    ref={register({ required: true })}
                                />
                                <span className="text-danger">{errors.name && 'Fusha Emrit duhet plotësuar'}</span>
                            </div>
                            <div className="form-group">
                                <textarea 
                                    className="form-control" 
                                    name="description"
                                    rows="4" 
                                    placeholder="Përshkrimi"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    ref={register({ required: true })}
                                >
                                </textarea>
                                <span className="text-danger">{errors.description && 'Fusha Përshkrimit duhet plotësuar'}</span>
                            </div>

                            <input type="submit" className="btn btn-secondary btn-block" value="Regjistro" />
                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}