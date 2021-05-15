import React, { useEffect } from 'react';
import { listKomunat, deleteKomuna } from '../../actions/komunaActions';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import './add_screen.css';

function KomunatScreen(props) {
 
    const dispatch = useDispatch();

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    const komunatList = useSelector(state => state.komunatList);
    const { komunat, loading: loadingKomunat, error: errorKomunat } = komunatList;

    const komunaDelete = useSelector(state => state.komunaDelete);
    const { success: successDelete } = komunaDelete;

    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/profile po tek logini, e di a jom i logum permes userInfo(cookie pra)
            props.history.push("/login");
        }
        if(userInfo && !userInfo.isAdmin) {
            props.history.push('/notfound');
        }
       
        dispatch(listKomunat());
        return () => {
    
        };
    }, [userInfo, successDelete])

    const deleteHandler = (komunaId) => {
        dispatch(deleteKomuna(komunaId));
    }

    const confirmToDelete = (komunaId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>A jeni i sigurtë se dëshironi me fshi? </h1>
                        <button onClick={onClose}>Anulo</button>
                        <button
                            onClick={() => {
                                deleteHandler(komunaId)
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
                <h3 className="text-center text-muted">Lista e komunave ({komunat ? komunat.length : ''})</h3>
                {
                    loadingKomunat ? <div className="loader"></div>:
                    errorKomunat ? <div className="text-danger text-center alert-general">{errorKomunat} </div> :
                    komunat.length === 0 ? <div className="alert alert-primary text-center alert-general" role="alert">
                            Ju nuk keni postuar asnje kategori ende.
                        </div> :
                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th>Komuna</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                        <tbody>
                            {
                                komunat.map(komuna => <tr key={komuna._id}>
                                    <td>{komuna.name}</td>
                                    <td>
                                        <button type="button" onClick={() => confirmToDelete(komuna._id)} className="button_admin secondary">Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                }
            </div>
    </div>
}

export default KomunatScreen;