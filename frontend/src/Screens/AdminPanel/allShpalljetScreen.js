import React, { useEffect } from 'react';
import { listAllShpalljet, deleteShpallja } from '../../actions/shpalljaActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import './add_screen.css';

function AllShpalljetScreen(props) {
 
    const dispatch = useDispatch();

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    const shpalljaAllList = useSelector(state => state.shpalljaAllList);
    const { allShpalljet, loading, error } = shpalljaAllList;

    const shpalljaDelete = useSelector(state => state.shpalljaDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = shpalljaDelete;


    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/profile po tek logini, e di a jom i logum permes userInfo(cookie pra)
            props.history.push("/login");
        }
        if(userInfo && !userInfo.isAdmin) {
            props.history.push('/notfound');
        }
       
        dispatch(listAllShpalljet());
        return () => {
    
        };
    }, [userInfo, successDelete])

    const deleteHandler = (shpalljaId) => {
        dispatch(deleteShpallja(shpalljaId));
    }

    const confirmToDelete = (shpalljaId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>A jeni i sigurtë se dëshironi me fshi? </h1>
                        <button onClick={onClose}>Anulo</button>
                        <button
                            onClick={() => {
                                deleteHandler(shpalljaId)
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
                <h3 className="text-center text-muted">Lista e shpalljeve ({allShpalljet ? allShpalljet.length : ''})</h3>
                {
                    loading ? <div className="loader"></div>:
                    error ? <div className="text-danger text-center alert-general" id="s2id_autogen1_search">{error} </div> :
                    allShpalljet.length === 0 ? <div className="alert alert-primary text-center alert-general" role="alert">
                            Nuk ka ende asnjë shpallje.
                        </div> :
                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th>EMRI</th>
                                    <th>EMAIL</th>
                                    <th>KATEGORIA</th>
                                    <th>KOMUNA</th>
                                    <th>TITULLI</th>
                                    <th>PERSHKRIMI</th>
                                    <th>PUBLIKUAR</th>
                                    <th>APROVUAR</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                        <tbody>
                            {
                                allShpalljet.map(shpallja => <tr key={shpallja._id}>
                                    <td>{shpallja.name}</td>
                                    <td>{shpallja.email}</td>
                                    <td>{shpallja.category}</td>
                                    <td>{shpallja.komuna}</td>
                                    <td>{shpallja.title}</td>
                                    <td>{shpallja.description}</td>
                                    <td>{moment(shpallja.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                    <td>{shpallja.isApproved ? 'Aprovuar' : 'Nuk është aprovuar'}</td>
                                    <td>
                                    { shpallja.isApproved ? ' ' : <Link to={"/aprovo-shpalljen/" + shpallja._id} className="button_admin secondary">Aprovo</Link> }
                                    </td>
                                    <td>
                                        <Link to="lista-shpalljeve" onClick={() => confirmToDelete(shpallja._id)} className="button_admin secondary">Delete</Link>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                }
            </div>
    </div>
}

export default AllShpalljetScreen;