import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMineShpalljet, deleteShpallja } from '../../actions/shpalljaActions';
import { update, logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-js';
import * as Toastr from 'toastr';
import 'toastr/build/toastr.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import './add_screen.css';

function ProfileScreen(props) {

    const [name, setName] = useState(''); //keto vlera name, password, email i marrim nga state -> userInfo i ka keto te dhena ne vetem i marrim prandaj atje tek inputi kur e boj value={name} ma qet emrin e userit qe eshte i logum ne input
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    
    const myShpalljetList = useSelector(state => state.myShpalljetList);
    const { loading: loadingShpalljet, shpalljet, error: errorShpalljet } = myShpalljetList;

    const shpalljaDelete = useSelector(state => state.shpalljaDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = shpalljaDelete;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;

    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/profile po tek logini, e di a jom i logum permes userInfo(cookie pra)
            props.history.push("/login");
        }

        if (userInfo) {
          console.log(userInfo.name)
          setEmail(userInfo.email);
          setName(userInfo.name);
          setPassword(userInfo.password);
        }
        dispatch(getMineShpalljet());
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

    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(update({ userId: userInfo._id, email, name, password }));
        // if(success) {
        //     Toastr.success('Profili u editua me sukses.')
        // }
        showDiv();
        hideDiv();
    }

    const showDiv = () => {
        setTimeout(() => {
            document.getElementById('sucessmsg').style.visibility = 'visible';
        }, 100);
    }

    const hideDiv = () => {
        setTimeout(() => {
            document.getElementById('sucessmsg').style.visibility = 'hidden';
        }, 3000);
    }

    return <div className="profile" id="profile_container">
        <div className="profile-info" id="select2-drop">
           <form onSubmit={submitHandler}>
                <h2>Profili Juaj</h2>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {success && <div id="sucessmsg" style={{visibility: 'hidden'}}>Profili u Editua me sukses.</div> }
               <div className="form-group">
                     <label htmlFor="name">
                        Emri
                    </label>
                    <input value={name || ''} className="form-control" type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} />
               </div>
               <div className="form-group">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input value={email || ''} className="form-control" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className="form-group">
                    <label htmlFor="password">
                        Fjalëkalimi
                    </label>
                    <input value={password || ''} className="form-control" type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
               </div>
               <input type="submit" className="btn btn-secondary btn-block primary" value="Edito" />
               <input type="submit" onClick={handleLogout} className="btn btn-secondary btn-block secondary" value="Largohu" />

           </form>
        </div>
        <div className="profile-shpalljet content-margined">
            <h3 className="text-center text-muted">Shpalljet Tuaja ({shpalljet ? shpalljet.length : ''})</h3>
            {
                loadingShpalljet ? <div className="loader"></div> :
                errorShpalljet ? <div className="text-danger">{errorShpalljet} </div> :
                shpalljet.length === 0 ? <div className="alert alert-primary text-center alert-general" role="alert">
                        Ju nuk keni postuar asnje shpallje ende.
                    </div> :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>EMRI</th>
                                <th>EMAIL</th>
                                <th>KATEGORIA</th>
                                <th>PUBLIKUAR</th>
                                <th>KOMUNA</th>
                                <th>PRICE</th>
                                <th>APROVUAR</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                    <tbody>
                        { 
                            shpalljet.map(shpallja => <tr key={shpallja._id}>
                                <td>{shpallja.name}</td>
                                <td>{shpallja.email}</td>
                                <td>{shpallja.category}</td>
                                <td>{moment(shpallja.createdAt).format('YYYY-MM-DD HH:mm:ss') }</td>
                                <td>{shpallja.komuna}</td>
                                <td>€{shpallja.price}</td>
                                <td>{shpallja.isApproved ? 'Po' : 'Jo' }</td>
                                <td>
                                    <Link to={"/shpallja/" + shpallja._id}>DETAILS</Link>
                                    {/* <button type="button" onClick={() => deleteHandler(shpallja)} className="button secondary-delete">Delete</button> */}
                                    <button type="button" onClick={() => confirmToDelete(shpallja._id)} className="button secondary-delete">
                                        Delete
                                    </button>
                                </td> 
                            </tr>)
                        }
                    </tbody>
                </table>
            }
        </div>
    </div>
}

export default ProfileScreen;