import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listCategories } from '../../actions/categoryActions';
import './categories.css';

export default function Home(props) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';
    const categoriesList = useSelector(state => state.categoriesList);
    const { categories, loading, error } = categoriesList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listCategories());

        return () => {
        //
        };
    }, []);

   
  
    return (
        <div className="container" id="categories_screen">
            <h3 className="text-center text-muted mt-3">Kategoritë ({categories ? categories.length : ''})</h3>
            <div className="row" id="select2-drop">
                { loading ? <div className="loader"></div> : ''}
                {error ? <span className="text-danger text-center alert-general">{error}</span> : ''}                
                {categories.map((category) => (
                    <div className="col-md-3 col-sm-6 mt-3" key={category._id}>
                        <div className="product-grid2">
                            <div className="product-image2">
                                <Link to={`/category/${category.name}`}>
                                    <img className="pic-1" src={`${category.images[0]}`} alt="Kategoria" />
                                </Link>
                                <ul className="social">
                                    <li><Link to={`/category/${category.name}`} data-tip="Quick View"><i className="fa fa-eye"></i></Link></li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="title"><Link to={`/shpallja/${category.name}`}>{category.name}</Link></h3>
                            </div>
                        </div>
                    </div>  
                ))}
               
            </div>
        </div>
    )
}