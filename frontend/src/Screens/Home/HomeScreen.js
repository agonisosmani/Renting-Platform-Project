import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listCategories, categoriessLength } from '../../actions/categoryActions';
import { listKomunat } from '../../actions/komunaActions';
import { listMembers, members_length } from '../../actions/memberAction';

import { AiFillStar } from 'react-icons/ai';

import './home.css';
import './style.css';

export default function Home(props) {
    const [categoryKeyword, setCategoryKeyword] = useState('');
    const [komuna, setKomuna] = useState('');
    const [slideCount, setSlideCount] = useState(4);
    const [reviewCount, setReviewCount] = useState(4);
    const [limit, setLimit] = useState(4); // i bjen qe 4 me mi shfaq ne nje page
    const [skip, setSkip] = useState(0);
    const [limitMembers, setLimitMembers] = useState(4); // i bjen qe 4 me mi shfaq ne nje page
    const [skipMembers, setSkipMembers] = useState(0);
     
    const categoriesList = useSelector(state => state.categoriesList);
    const { categories,loading, error } = categoriesList;

    const membersList = useSelector(state => state.membersList);
    const { members,loading: loadingMember, error: errorMember } = membersList;

    const categoryLength = useSelector(state => state.categoryLength);
    const { categoriesLength } = categoryLength;

    const members_Length = useSelector(state => state.members_Length);
    const { membersLength } = members_Length;

    const komunatList = useSelector(state => state.komunatList);
    const { komunat } = komunatList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listCategories(limit, skip));
        dispatch(categoriessLength());
        dispatch(listMembers(limitMembers,skipMembers));
        dispatch(members_length());
        dispatch(listKomunat());

        return () => {
            //
        };
    }, [skip, limit, skipMembers, limitMembers]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(categoryKeyword || komuna) {
            props.history.push(`/search/${categoryKeyword}/${komuna}`);
        }
    };

    const nextPage = () => {
        setSkip(skip + limit);
        setSlideCount(slideCount + 4);
    }

    const previousPage = () => {
        setSkip(skip - limit);
        setSlideCount(slideCount - 4);
    }

    const nextPageForReview = () => {
        setSkipMembers(skipMembers + limitMembers);
        setReviewCount(reviewCount + 4);
    }

    const previousPageForReview = () => {
        setSkipMembers(skipMembers - limitMembers);
        setReviewCount(reviewCount - 4);
    }

    const openView = (event) => {
        event.stopPropagation();
        document.getElementById("select2-drop").classList.toggle("show");
    }

    const openSecondView = (event) => {
        event.stopPropagation();
        document.getElementById("select3-drop").classList.toggle("show");
    }

    // //per me na mshel dropdown-in edhe kur klikoj kudo jasht saj, pa rreshtin 78 nuk funksionon.
    window.onclick = (event) => {
        var search = document.getElementById('s2id_autogen1_search');

        if(event.target !== search) {
            document.getElementById("select2-drop").classList.remove("show");
            
        }
    }

    const close = (e) => {
        setKomuna(e);
        document.getElementById("select3-drop").classList.remove("show");
    }
   
    const filterFunction = () => {
        var input, filter,a,i,div,txtValue;
        input = document.getElementById("s2id_autogen1_search");
        filter = input.value.toUpperCase();
        div = document.getElementById("select2-drop");
        a = div.getElementsByTagName("li");
        for (i = 0; i < a.length; i++) {
            txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
            } else {
            a[i].style.display = "none";
            }
        }
    }

    const filterFunction2 = () => {
        var input, filter,a,i,div,txtValue;
        input = document.getElementById("s2id_autogen1_search2");
        filter = input.value.toUpperCase();
        div = document.getElementById("select3-drop");
        a = div.getElementsByTagName("li");
        for (i = 0; i < a.length; i++) {
            txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
            } else {
            a[i].style.display = "none";
            }
        }
    }

    return (
        <div className="container-fluid" id="home_screen">
            <section className="search-hero hero promotional is-loaded" style={{overflow: 'visible'}}>
                <div className="wrapper wrapper--small">
                    <h1 className="search-page__title hero__title">
                        "RENT" çdo gjë, nga çdokush!
                    </h1>
                    <form id="yw0" onSubmit={submitHandler}>
                        <div className="search-page-form / grid grid--center small-gutters-1 form-1_div">
                            <div className="search-page__specialty / grid__item medium-5-12" id="medium-5-12">
                                <label className="search-page__label show-small" htmlFor="">Kategoria</label>
                                <div className="select2-container input--large input--dark-bg search-page__specialty specialty-select" id="s2id_fCondition">
                                    <a href="javascript:void(0)" className="select2-choice" tabIndex="-1" onClick={openView}>   
                                        <span className="select2-chosen" id="select2-chosen-1">   
                                            {categoryKeyword ? categoryKeyword : 'Çfarë kërkoni?' }                  
                                            </span><abbr className="select2-search-choice-close"></abbr>   
                                            <span className="select2-arrow" role="presentation">
                                                <b role="presentation"></b>
                                            </span>
                                    </a>
                                    <label htmlFor="s2id_autogen1" className="select2-offscreen"></label>
                                    <input 
                                        className="select2-focusser select2-offscreen" 
                                        type="text" 
                                        aria-haspopup="true" 
                                        role="button" 
                                        aria-labelledby="select2-chosen-1" 
                                        id="s2id_autogen1" 
                                    />
                                
                                    <div className="select2-drop select2-display-none select2-with-searchbox select2-drop-active" id="select2-drop">   
                                        <div className="form-group select2-s">       
                                            <label htmlFor="s2id_autogen1_search" className="select2-offscreen"></label>       
                                            <input 
                                                type="text" 
                                                onChange={filterFunction} 
                                                autoComplete="off" 
                                                autoCorrect="off" 
                                                autoCapitalize="off" 
                                                spellCheck="false" 
                                                className="ui-autocomplete-input select2-input" 
                                                role="combobox" 
                                                aria-expanded="true" 
                                                aria-autocomplete="list" 
                                                aria-owns="select2-results-1" 
                                                id="s2id_autogen1_search" 
                                                placeholder="" 
                                                aria-activedescendant="select2-result-label-751" 
                                            />   
                                        </div>   
                                        <ul className="select2-results" role="listbox" id="select2-results-1">
                                            <li className="select2-results-dept-0 select2-result select2-result-selectable" role="presentation">
                                                <div className="select2-result-label" id="select2-result-label-748" role="option">
                                                    Selekto kategorinë?                        
                                                </div>
                                            </li>
                                            {categories.map((category) => <li key={category._id} onClick={() => setCategoryKeyword(category.name)} className="select2-results-dept-0 select2-result select2-result-selectable specialty">
                                                <div className="select2-result-label" id="select2-result-label-749" role="option">{category.name}</div>
                                            </li> )}

                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="search-page__specialty / grid__item medium-5-12" id="medium-5-12">
                                <label className="search-page__label show-small" htmlFor="">Komuna</label>
                                <div className="select2-container input--large input--dark-bg search-page__specialty specialty-select" id="s2id_fCondition">
                                    <a href="javascript:void(0)" className="select2-choice" tabIndex="-1" onClick={openSecondView}>   
                                        <span className="select2-chosen" id="select2-chosen-1">   
                                            {komuna ? komuna : 'Komuna?' }                  
                                            </span><abbr className="select2-search-choice-close"></abbr>   
                                            <span className="select2-arrow" role="presentation">
                                                <b role="presentation"></b>
                                            </span>
                                    </a>
                                    <label htmlFor="s2id_autogen1" className="select2-offscreen"></label>
                                    <input 
                                        className="select2-focusser select2-offscreen" 
                                        type="text" 
                                        aria-haspopup="true" 
                                        role="button" 
                                        aria-labelledby="select2-chosen-1" 
                                        id="s2id_autogen1" 
                                    />
                                
                                    <div className="select2-drop select2-display-none select2-with-searchbox select2-drop-active" id="select3-drop">   
                                        <div className="form-group select2-s">       
                                            <label htmlFor="s2id_autogen1_search2" className="select2-offscreen"></label>       
                                            <input 
                                                type="text" 
                                                onChange={filterFunction2} 
                                                autoComplete="off" 
                                                autoCorrect="off" 
                                                autoCapitalize="off" 
                                                spellCheck="false" 
                                                className="ui-autocomplete-input select2-input" 
                                                role="combobox" 
                                                aria-expanded="true" 
                                                aria-autocomplete="list" 
                                                aria-owns="select2-results-1" 
                                                id="s2id_autogen1_search2" 
                                                placeholder="" 
                                                aria-activedescendant="select2-result-label-751" 
                                            />   
                                        </div>   
                                        <ul className="select2-results" role="listbox" id="select2-results-1">
                                            <li className="select2-results-dept-0 select2-result select2-result-selectable" role="presentation">
                                                <div className="select2-result-label" id="select2-result-label-748" role="option">
                                                    Selekto komunën?                        
                                                </div>
                                            </li>
                                            {komunat.map((komuna) => <li key={komuna._id} onClick={() => close(komuna.name)} className="select2-results-dept-0 select2-result select2-result-selectable specialty">
                                                <div className="select2-result-label" id="select2-result-label-749" role="option">{komuna.name}</div>
                                            </li> )}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="search-page__submit / grid__item medium-3-12">
                                <span onClick={submitHandler} id="s-home-submit-specialty" className="button button--urgent button--large button--rectangular button--full-width">
                                    Kërko
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        { categories ? <section className="bg-ghostwhite-home" id="ghostwhite-home1" style={{marginTop: '113px'}}>
            <div className="ruckify-container-home">
                <h1 className="kategoritë text-muted"><Link to="/kategoritë" style={{fontSize: '20px'}}>Kategoritë<b>(shiko të gjitha)</b></Link></h1>
                    <div className="col-lg-12 col-12 px-2 px-lg-4 mb-4 items-cards-grid">
                        <div className="col-md-12"></div>
                        <div className="row"> 
                            { loading ? <div className="loader"></div> : ''}
                            {error ? <span className="text-danger text-center alert-general">{error}</span> : ''} 
                            {categories.map((category) => (
                                <div className="col-6 col-md-6 col-lg-3 d-flex" key={category._id}>
                                {" "}
                                {/* prej ktu duhet me dal ato krejt me foto me t dhana, dmth kjo perseritet */}
                                    <div style={{ width: "100%" }}>
                                        <div
                                            id="marketplace_postedItem"
                                            className="item-card mb-4 d-flex"
                                        >
                                        <div className="d-flex item-top-labels bg-white">
                                            {/* <p className="ml-auto p-1">0.4 mi</p> */}
                                        </div>
                                        <Link to={`/category/${category.name}`}>
                                            <img
                                                className="item-img w-100"
                                                src={`${category.images[0]}`}
                                                alt="Kategoria"
                                            />
                                        </Link>
                                        <div className="item-details d-flex">
                                            <div className="item-text">
                                            
                                                <label
                                                    className="h3 txt-grey"
                                                    id="posted-item-title"
                                                >
                                                <Link to={`/category/${category.name}`}>
                                                    {category.name}
                                                </Link>
                                                </label>
                                            
                                            </div>
                                            <div className="d-flex no-gutters stars">
                                                <div className="col-12">
                                                    <div className="mt-lg-2 item-ratings">
                                                        <div className="rating-stars txt-grey">                                           
                                                            {
                                                                function() {
                                                                    let rows = [];
                                                                    for(let i = 0; i < category.rating; i++) {
                                                                        // rows.push(<i key={i} className="fas fa-star txt-grey"></i>)
                                                                        rows.push(<AiFillStar key={i} className="txt-grey" style={{fontSize: '1.5em'}} />)
                                                                    }
                                                                    return rows;
                                                                } ()
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                            {slideCount - 4 !== 0 ? 
                                <a
                                    className="carousel-control-prev"
                                    href="#kategoritë"
                                    onClick={previousPage}
                                    data-slide="prev"
                                >
                                <i className="fa fa-angle-left"></i>
                                </a> : '' 
                            }
                            {
                                slideCount <= categoriesLength - 1 ?
                                    <a  
                                        className="carousel-control-next"
                                        href="#kategoritë"
                                        onClick={nextPage}
                                        data-slide="next"
                                    >
                                    <i className="fa fa-angle-right"></i>
                                    </a> : ''
                            } 
                          
                            
                        </div>
                    </div>
                </div>
            </section> : ''}
           
            { members ? <section className="bg-ghostwhite-home">
                <div className="ruckify-container-home">
                    <h1 className="kategoritë text-muted">Member Reviews</h1>
                        <div className="col-lg-12 col-12 px-2 px-lg-4 mb-4 items-cards-grid">
                            <div className="col-md-12"></div>
                            <div className="row"> 
                                { loadingMember ? <div className="loader"></div> : ''}
                                {errorMember ? <span className="text-danger">{errorMember}</span> : ''} 
                                {members.map((member) => (
                                    <div className="col-6 col-md-6 col-lg-3 d-flex" key={member._id}>
                                        {" "}
                                        {/* prej ktu duhet me dal ato krejt me foto me t dhana, dmth kjo perseritet */}
                                        <div className="card card_hover" style={{width:'18rem'}}>
                                            <div className="card-body">
                                                <h5 className="card-title">{member.name}</h5>
                                                <p className="card-text">{member.description}</p>
                                            
                                            </div>
                                        </div>
                                    </div>

                                ))}
                                {reviewCount - 4 !== 0 ? 
                                    <a
                                        className="carousel-control-prev"
                                        href="#members_reviews"
                                        onClick={previousPageForReview}
                                        data-slide="prev"
                                    >
                                    <i className="fa fa-angle-left"></i>
                                    </a> : '' 
                                }
                                {
                                    reviewCount <= membersLength - 1 ?
                                        <a  
                                            className="carousel-control-next"
                                            href="#members_reviews"
                                            onClick={nextPageForReview}
                                            data-slide="next"
                                        >
                                        <i className="fa fa-angle-right"></i>
                                        </a> 
                                    : ''
                                } 
                            </div>
                        </div>
                </div>
            </section> : '' }
      </div>
    );
}