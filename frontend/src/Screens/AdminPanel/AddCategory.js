import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useForm, reset } from 'react-hook-form'; // LIBRARI PER VALIDIM TE INPUTEVE NE FUNCTION COMPONENTS
import * as Toastr from 'toastr';
import 'toastr/build/toastr.css';

import './add_screen.css';

export default function Add(props) {
    const { register, handleSubmit, errors } = useForm({});

    const [name, setName] = useState('');
    const [images, setImages] = useState('');
    const [rating, setRating] = useState('');

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/krijo-kategorin po tek logini, e di a jom i logum permes userInfo(cookie pra)
            props.history.push("/login");
        }
        if(userInfo && !userInfo.isAdmin) {
            props.history.push('/notfound');
        }   
      
        return () => {
        };
    }, []);

    const submitHandler = (e) => {
        const formData = new FormData();
        formData.append('name', name);
        for (const key of Object.keys(images)) {
            formData.append('images', images[key])
        }
        formData.append('rating', rating);

        axios.post('http://localhost:5000/api/categories', formData, {
            headers: {
              Authorization: 'Bearer ' + userInfo.token
            }
          }).then(res => {
            if(res.data.success) {
                Toastr.success('Kategoria u krijua me sukses.');   
                props.history.push('/admin-paneli');
            } else {
                Toastr.error('Kategoria nuk u krijua.Provo përsëri.');
            }
        })
    }

    return (
            <div id="shto_kategorin">
                <div className="container" id="select2-drop">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-md-10 mt-3 pb-2">
                            <h3 className="text-center text-secondary pb-2">Krijo Kategorin</h3>
                            <form onSubmit={handleSubmit(submitHandler)} className="mt-3 pt-5">
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
                                    <span className="text-danger">{errors.name && 'Fusha Emri duhet plotësuar'}</span>
                                </div>
                                    <div className="form-group">
                                        <input 
                                            type="file" 
                                            name="images"
                                            className="form-control-file border" 
                                            placeholder="Ngarkoni fotografi" 
                                            multiple
                                            onChange={ (e) => setImages(e.target.files) }
                                            ref={register({ required: true })}
                                        />
                                        <span className="text-danger">{errors.images && 'Ngarkoni Fotografi'}</span>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="number" 
                                            name="rating"
                                            className="form-control add_shpalljen" 
                                            placeholder="Rating" 
                                            onChange={ (e) => setRating(e.target.value) }
                                            ref={register({ required: true })}
                                        />
                                        <span className="text-danger">{errors.rating && 'Fusha Rating duhet plotësuar'}</span>
                                    </div>
                                
                                <input type="submit" className="btn btn-secondary btn-block" value="Krijo Kategorin" />
                            </form>

                        </div>
                </div>

            </div>
        </div>
    )
}