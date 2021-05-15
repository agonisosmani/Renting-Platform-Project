import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { listCategories } from '../../actions/categoryActions';
import { listKomunat } from '../../actions/komunaActions';
import { useForm } from 'react-hook-form'; // LIBRARI PER VALIDIM TE INPUTEVE NE FUNCTION COMPONENTS
import * as Toastr from 'toastr';
import 'toastr/build/toastr.css';

import './add_screen.css';

export default function Add(props) {
    const { register, reset, handleSubmit, errors } = useForm({
        // mode: "onBlur",
        // reValidateMode: "onChange" //keta dy rreshta kod(11,12) -> sepse po dojm validimi me vlejt edhe n onChange
    });

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    const categoriesList = useSelector(state => state.categoriesList);
    const { categories } = categoriesList;

    const komunatList = useSelector(state => state.komunatList);
    const { komunat } = komunatList;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [category, setCategory] = useState('');
    const [komuna, setKomuna] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState('');
    const [regexp, setRegexp] = useState(/^[0-9\b]+$/);

    const dispatchMethod = useDispatch();

    useEffect(() => {
        dispatchMethod(listCategories());
        dispatchMethod(listKomunat());

        return () => {
          //
        };
    }, []);

    const submitHandler = (e) => {
        // dispatchMethod(save(name,email,telephone,category,komuna,title,description,price,images))
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('telephone', telephone);
        formData.append('category', category);
        formData.append('komuna', komuna);
        formData.append('title', title);
        formData.append('description', description);
        for (const key of Object.keys(images)) {
            formData.append('images', images[key])
        }
        formData.append('price', price);
        axios.post('http://localhost:5000/api/regjistroShpalljen', formData, {
            headers: {
              Authorization: 'Bearer ' + userInfo.token
            }
          }).then(res => {
            console.log(res.data)
            if(res.data.success) {
                // Toastr.success('Shpallja u postua me sukses.');   
                // reset({name: '', email: '', telephone: '', category:'', komuna: '', title: '', description: '', price: '', images: ''}); // reset after form submit
                props.history.push('/njoftimi');
            } else {
                Toastr.error('Shpallja nuk u postua.Provo përsëri.');
            }
        })
    }

    //metod per mos me na leju tek inputi telephone me shkru tjeter sen perveq numer.
    const onHandleTelephoneChange = (e) => {
        let telephone = e.target.value;

        // if value is not blank, then test the regex
        if (telephone === '' || regexp.test(telephone)) {
            setTelephone(telephone)
        }
    };

    return (
            <div id="shto_shpalljen">
                <div className="container" id="select2-drop">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-10 mt-3 pb-2">
                        <h3 className="text-center text-secondary pb-2">Postoni Shpallje FALAS</h3>
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
                                <input 
                                    type="text" 
                                    name="email"
                                    className="form-control" 
                                    placeholder="Email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    ref={register({
                                        required: "Fusha Email-it duhet plotësuar",
                                        pattern: {
                                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                          message: "Email-i nuk është valid"
                                        }
                                      })}
                                />
                                <span className="text-danger">{errors.email && errors.email.message}</span>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="tel" 
                                    name="telephone"
                                    className="form-control" 
                                    placeholder="Telefoni" 
                                    value={telephone}
                                    onChange={onHandleTelephoneChange}
                                    // onChange={(e) => setTelephone(e.target.value)}
                                    ref={register({ required: true })}
                                />
                                <span className="text-danger">{errors.telephone && 'Fusha Telefonit duhet plotësuar'}</span>
                            </div>
                                <select 
                                    className="custom-select form-group kategorit" 
                                    name="category"
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                    ref={register({ required: true })}
                                    style={{fontSize: 'unset'}}
                                >
                                    <option value="">Zgjidhni një kategori</option>
                                    {categories.map((category) => <option value={category.name} key={category._id} >{category.name}</option>)}
                                </select>
                                <span className="text-danger">{errors.category && 'Fusha Kategorisë duhet plotësuar'}</span>
                                
                                <select 
                                    className="custom-select form-group kategorit" 
                                    name="komuna"
                                    value={komuna} 
                                    onChange={(e) => setKomuna(e.target.value)}
                                    ref={register({ required: true })}
                                    style={{fontSize: 'unset'}}
                                >
                                    <option value="">Zgjidhni komunën</option>
                                    {komunat.map((komuna) => <option value={komuna.name} key={komuna._id} >{komuna.name}</option>)}
                                </select>
                                <span className="text-danger">{errors.komuna && 'Fusha Komunës duhet plotësuar'}</span>
                                
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        name="title"
                                        className="form-control" 
                                        placeholder="Titulli" 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        ref={register({ required: true })}
                                    />
                                    <span className="text-danger">{errors.title && 'Fusha Titullit duhet plotësuar'}</span>
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
                                        type="text" 
                                        name="price"
                                        className="form-control" 
                                        placeholder="Çmimi" 
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            <input type="submit" className="btn btn-secondary btn-block" value="Posto Shpalljen" />
                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}