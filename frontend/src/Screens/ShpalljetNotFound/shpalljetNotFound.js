import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listCategories } from '../../actions/categoryActions';
import { listKomunat } from '../../actions/komunaActions';
import * as Toastr from 'toastr';
import 'toastr/build/toastr.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './shpalljet_not_found.css';

export default function ShpalljetNotFound(props) {
    const { register,reset, handleSubmit, errors } = useForm({  // LIBRARI PER VALIDIM TE INPUTEVE NE FUNCTION COMPONENTS
        mode: "onBlur",
        reValidateMode: "onChange" //keta dy rreshta kod(11,12) -> sepse po dojm validimi me vlejt edhe n onChange
    });

    const [categoryKeyword, setCategoryKeyword] = useState('');
    const [komuna, setKomuna] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');

    const categoriesList = useSelector(state => state.categoriesList);
    const { categories } = categoriesList;

    const komunatList = useSelector(state => state.komunatList);
    const { komunat } = komunatList;
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listCategories());
        dispatch(listKomunat());

        return () => {
        //
        };
    }, []);

    const formHandler = () => {
        axios.post("http://localhost:5000/api/shpalljaNotFound", {name,telephone,email,city,description})
        .then(response => {
            if(response.data.success) {
                Toastr.success('Mesazhi u dërgua me sukses.');
                reset({name: '',telephone: '', email: '', city: '', description: ''}); // reset after form submit
            } else {
                Toastr.error('Mesazhi nuk u dërgua.');
            }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/search/${categoryKeyword}/${komuna}`)
    };

    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        if(categoryKeyword && komuna) {
            props.history.push(`/search/${categoryKeyword}/${komuna}`);
        }
    };
 
    return (
        <section className="bg-ghostwhite" style={{overflow: 'hidden'}}>
            <div className="ruckify-container" id="select2-drop">
                <div className="row pt-lg-3">
                    <div className="col-lg-3 px-2 left_one">
                        <div className="search-bar-wrapper search-results-form">
                            <form id="re-search-button" onSubmit={(submitHandler)}>
                                <div className="search-form-container p-lg-3">
                                    <div className="form-row">
                                        <div className="col-12 mb-3">
                                            <label className="d-block p-2 p-lg-0 mb-0 mb-lg-3">
                                                <span className="icon icon-search d-inline d-lg-none">&nbsp;</span>
                                                Kërko
                                            </label>
                                            {/* <input 
                                                type="text" 
                                                id="search-form-search-input" 
                                                className="form-control input_same" 
                                                placeholder="Kërko" 
                                                onChange={(e) => setCategoryKeyword(e.target.value)}
                                            /> */}
                                        </div>
                                        <div className="searchresults-searchfilters">
                                            <div className="form-group col-sm-12 col-12 mb-3">
                                            <select className="form-control" id="select-form" onChange={(e) => setCategoryKeyword(e.target.value)}>
                                                <option className="_white" value="">Selekto një kategori</option>
                                                {categories.map((category) => <option 
                                                    className="_white" 
                                                    value={category.name} 
                                                    key={category._id} 
                                                    >{category.name}
                                                    </option>)}
                                            </select>
                                            </div>
                                            <div id="search-form-address" className="col-12 mb-3">
                                            <label className="font-weight-bold mb-3 d-block">Lokacioni</label>
                                            <select className="form-control" id="select-form" onChange={(e) => setKomuna(e.target.value)}>
                                                <option className="_white" value="">Selekto komunën</option>
                                                {komunat.map((komuna) => <option 
                                                    className="_white" 
                                                    value={komuna.name} 
                                                    key={komuna._id} 
                                                    >{komuna.name}
                                                    </option>)
                                                }
                                                    
                                            </select>
                                            <button type="reset" className="btn btn-default clear-filters mb-1">Clear Filters</button>
                                            <button type="submit" className="btn btn-default search_button_head">Filtro</button>
                                            </div>
                                            <div className="form-group col-12">
                                                <label className="font-weight-bold mb-3 d-block">Sorto</label>
                                                <div className="form-check">
                                                    <input type="radio" name="cmimet" className="form-check-input" id="filter_sort1" value="" onChange={sortHandler} />
                                                    <label className="form-check-label">&nbsp; Më të rejat</label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="radio" name="cmimet" className="form-check-input" id="filter_sort2" value="lowest" onChange={sortHandler} />
                                                    <label className="form-check-label">&nbsp; Çmimet më të ulta</label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="radio" name="cmimet" className="form-check-input" id="filter_sort3" value="highest" onChange={sortHandler} />
                                                    <label className="form-check-label">&nbsp; Çmimet më të shtrenjëta</label>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    <div className="col-lg-9 col-12 px-2 px-lg-4 mb-4 items-cards-grid">
                        <div className="row justify-content-center mt-3">
                            <div className="col-12 col-lg-10">
                                <div className="card">
                                    <h5 className="card-header font-weight-bold text-center bg-orange text-white">Na lejoni t'ju ndihmojmë të gjeni atë që po kërkoni!</h5>
                                    <div className="card-body">
                                        <p>Na vjen shumë keq! Artikulli që po kërkoni nuk është ende në platformën tonë. Por një anëtar i ekipit ende mund ta gjejë atë për ju! Thjesht plotësoni formularin më poshtë dhe ne do të ju kontaktojm. </p>
                                        <form id="book-now-form" onSubmit={handleSubmit(formHandler)}>
                                            <div className="form-group search">
                                                <input 
                                                    type="text" 
                                                    name="name"
                                                    className="form-control input_same" 
                                                    placeholder="Emri"
                                                    onChange={(e) => setName(e.target.value)}
                                                    ref={register({ required: true })}
                                                />
                                            </div>
                                            <span className="text-danger">{errors.name && 'Fusha Emrit duhet plotësuar'}</span>
                                            <div className="form-group search">
                                                <input 
                                                    type="number" 
                                                    name="telephone"
                                                    className="form-control input_same" 
                                                    placeholder="Telefoni"
                                                    onChange={(e) => setTelephone(e.target.value)} 
                                                    ref={register({ required: true })}
                                                />
                                            </div>
                                            <span className="text-danger">{errors.telephone && 'Fusha Telefonit duhet plotësuar'}</span>
                                            <div className="form-group search">
                                                <input 
                                                    type="text" 
                                                    name="email"
                                                    className="form-control input_same" 
                                                    placeholder="E-maili" 
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    ref={register({
                                                        required: "Fusha Email-it duhet plotësuar",
                                                        pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Emaili nuk është valid"
                                                        }
                                                    })}
                                                />
                                            </div>
                                            <span className="text-danger">{errors.email && errors.email.message}</span>
                                            <div className="form-group search">
                                                <input 
                                                    type="text" 
                                                    name="city"
                                                    className="form-control input_same" 
                                                    placeholder="Qyteti" 
                                                    onChange={(e) => setCity(e.target.value)}
                                                    ref={register({required: true })}
                                                />
                                            </div>
                                            <span className="text-danger">{errors.city && 'Fusha Qytetit duhet plotësuar'}</span>
                                            <div className="form-group search">
                                                <textarea 
                                                    className="form-control search_help input_same"
                                                    name="description" 
                                                    placeholder="Çfarë mund t'ju ndihmojmë të gjeni?"
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    ref={register({required: true })}
                                                >  
                                                </textarea>
                                            </div>
                                            <span className="text-danger">{errors.description && 'Fusha Përshkrimit duhet plotësuar'}</span>
                                            <div className="text-center pt-2">
                                                <button type="submit" className="button--solid-orange">Dërgo</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}