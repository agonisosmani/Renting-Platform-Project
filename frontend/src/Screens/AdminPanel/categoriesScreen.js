import React, { useEffect } from 'react';
import { listCategories, deleteCategory } from '../../actions/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import './add_screen.css';

function CategoriesScreen(props) {
 
    const dispatch = useDispatch();

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    
    const categoriesList = useSelector(state => state.categoriesList);
    const { categories, loading: loadingCategories, error: errorCategories } = categoriesList;

    const categoryDelete = useSelector(state => state.categoryDelete);
    const { success: successDelete } = categoryDelete;

    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/profile po tek logini, e di a jom i logum permes userInfo(cookie pra)
            props.history.push("/login");
        }
        if(userInfo && !userInfo.isAdmin) {
            props.history.push('/notfound');
        }
       
        dispatch(listCategories());
        return () => {
    
        };
    }, [userInfo, successDelete])

    const deleteHandler = (categoryId) => {
        dispatch(deleteCategory(categoryId));
    }

    const confirmToDelete = (categoryId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>A jeni i sigurtë se dëshironi me fshi? </h1>
                        <button onClick={onClose}>Anulo</button>
                        <button
                            onClick={() => {
                                deleteHandler(categoryId)
                                onClose();
                            }}
                        >
                        Po, Fshije!
                        </button>
                    </div>
                );
            }
        });
        
    }

    return <div className="profile" id="categories_screen">
            <div className="col-sm-12 col-md-12 profile-shpalljet content-margined" id="select2-drop">
                <h3 className="text-center text-muted">Lista e kategorive ({categories ? categories.length : ''})</h3>
                {
                    loadingCategories ? <div className="loader"></div>:
                    errorCategories ? <div className="text-danger text-center alert-general">{errorCategories} </div> :
                    categories.length === 0 ? <div className="alert alert-primary text-center alert-general" role="alert">
                            Ju nuk keni postuar asnje kategori ende.
                        </div> :
                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th>EMRI</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                        <tbody>
                            {
                                categories.map(category => <tr key={category._id}>
                                    <td>{category.name}</td>
                                    <td>
                                        <button type="button" onClick={() => confirmToDelete(category._id)} className="button_admin secondary">Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                }
            </div>
    </div>
}

export default CategoriesScreen;