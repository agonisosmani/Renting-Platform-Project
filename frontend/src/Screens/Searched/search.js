import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listShpalljet } from '../../actions/shpalljaActions';
import { listKomunat } from '../../actions/komunaActions';
import { listCategories } from '../../actions/categoryActions';
import moment from 'moment-js';

import './search.css';

export default function Search(props) {
    const [categoryKeyword, setCategoryKeyword] = useState('');
    const [komuna, setKomuna] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [submitForm, setSubmitForm] = useState(false);

    //pa kto t 2  nuk bon search sepse duhet me dit na n baz t qka po bojm search qe me thirr metoden listShpalljet n baz t njeres prej ktyre ose n baz t krejtve n baz t qka t shkrun useri pra n input
    const category = props.match.params.category ? props.match.params.category : '';
    const location = props.match.params.location ? props.match.params.location : ''; //rreshti 15,16 -> tek routes.js e kom url: /search/:category/:location -> pra kom me bo search n baz t kategoris dhe lokacionit qe kur useri e shkrun aty n home page n banner Makina/Prishtine - duhet mem pru n kete page Search me ato produkte qe i ka lyp useri e prandaj pe perdori kete logjik kshtu /pra kjo category dhe lokaction eshte per url, params.category sepse tek routes e kom /:category dhe params.location sepse tek routes.js e kom searc/:category/:location

    const shpalljaList = useSelector((state) => state.shpalljaList);
    const { shpalljet, foundOrNot, loading, error } = shpalljaList;

    const categoriesList = useSelector(state => state.categoriesList);
    const { categories } = categoriesList;

    const komunatList = useSelector(state => state.komunatList);
    const { komunat } = komunatList;

    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(listShpalljet(category,location));
    dispatch(listCategories());
    dispatch(listKomunat());

    return () => {
      //
    };
  }, [category,location]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listShpalljet(categoryKeyword, komuna, sortOrder));
    };

    const sortHandler = (e) => {
        console.log(e.target.value)
        setSortOrder(e.target.value);
        dispatch(listShpalljet(category, location, e.target.value));
    };
  
    return (
        <section className="bg-ghostwhite" id="select2-drop">
            <div className="ruckify-container">
                <div className="row pt-lg-3">
                    <div className="col-lg-3 px-2 left_one">
                        <div className="search-bar-wrapper search-results-form">
                            <form id="re-search-button" onSubmit={submitHandler}>
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
                                            <button type="submit" className="btn btn-default search_button_head" onClick={() => setSubmitForm(true)}>Filtro</button>
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
                        <h5 className="mb-2 mt-1 text-center shpalljet_rez">Rezultatet e kërkimit për <small className="search-term">{submitForm ? categoryKeyword : category}</small>:{shpalljet.length}</h5>
                        <div className="col-md-12"></div>
                        <div className="row">
                        { loading ? <div className="loader"></div> : ''}
                        {error ? <span className="text-danger text-center alert-general">{error}</span> : ''}
                        {foundOrNot ? <div className="alert alert-primary text-center no_content" id="alert_category" role="alert">Asnjë rezultat me kategorinë e kërkuar.</div> : ''}
                        {shpalljet.map((shpallja) => (
                            <div className="col-6 col-md-4 col-lg-3 d-flex" key={shpallja._id}> {/* prej ktu duhet me dal ato krejt me foto me t dhana, dmth kjo perseritet */}
                                <div style={{width: '100%'}}>
                                    <div id="marketplace_postedItem" className="item-card mb-4 d-flex">
                                        <div className="d-flex item-top-labels bg-white">
                                            {/* <p className="ml-auto p-1">0.4 mi</p> */}
                                        </div>
                                        <Link to={`/shpallja/${shpallja._id}`}>
                                            <img className="item-img w-100" src={`${shpallja.images[0]}`} alt="Shpallja" />
                                        </Link>
                                        <div className="item-details d-flex">
                                            <div className="item-text">
                                                <label className="h3 txt-grey" id="posted-item-title"><Link to={`/shpallja/${shpallja._id}`}>{shpallja.title}</Link></label>
                                                <p className="small text-capitalize">€{shpallja.price}</p>
                                                <p className="small text-capitalize">Publikuar:{moment(shpallja.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>

                                            </div>
                                            <div className="d-flex no-gutters stars">
                                                <div className="col-12">
                                                    <div className="mt-lg-2 item-ratings">
                                                        <div className="rating-stars txt-grey">
                                                            <i className="fas fa-star txt-grey"></i>
                                                            <i className="fas fa-star txt-grey"></i>
                                                            <i className="fas fa-star txt-grey"></i>
                                                            <i className="fas fa-star txt-grey"></i>
                                                        </div>
                                                    </div>
                                                    <select className="rental_rates form-control w-100 mt-2" id="starting-form-price">
                                                        <option>Duke filluar nga €10</option>
                                                        <option>€10 në ditë</option>
                                                        <option>€20 në muaj</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}