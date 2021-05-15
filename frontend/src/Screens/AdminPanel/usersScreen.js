import React, { useEffect } from 'react';
import { listUsers, deleteUser } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import './add_screen.css';

function UsersScreen(props) {
 
    const dispatch = useDispatch();

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    const usersList = useSelector(state => state.usersList);
    const { users, loading: loadingUsers, error: errorUsers } = usersList;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/profile po tek logini, e di a jom i logum permes userInfo(cookie pra)
            props.history.push("/login");
        }
        if(userInfo && !userInfo.isAdmin) {
            props.history.push('/notfound');
        }
       
        dispatch(listUsers());
        return () => {
    
        };
    }, [userInfo, successDelete])

    const deleteHandler = (userId) => {
        dispatch(deleteUser(userId));
    }

    const confirmToDelete = (userId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>A jeni i sigurtë se dëshironi me fshi? </h1>
                        <button onClick={onClose}>Anulo</button>
                        <button
                            onClick={() => {
                                deleteHandler(userId)
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

    return <div className="profile" id="members_screen">
            <div className="col-sm-12 col-md-12 profile-shpalljet content-margined" id="select2-drop">
                <h3 className="text-center text-muted">Lista e Përdoruesve ({users ? users.length : ''})</h3>
                {
                    loadingUsers ? <div className="loader"></div>:
                    errorUsers ? <div className="text-danger text-center alert-general">{errorUsers} </div> :
                    users.length === 0 ? <div className="alert alert-primary text-center alert-general" role="alert">
                            Ju nuk keni asnje përdorues ende.
                        </div> :
                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th>EMRI</th>
                                    <th>EMAIL</th>
                                    <th>ROLI</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                        <tbody>
                            {
                                users.map(user => <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                                    <td>
                                        <button type="button" onClick={() => confirmToDelete(user._id)} className="button_admin secondary secondary-delete">Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                }
            </div>
    </div>
}

export default UsersScreen;