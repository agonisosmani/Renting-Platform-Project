import React, { useEffect } from 'react';
import { listMessages, deleteMessage } from '../../actions/shpalljaNotFoundActions';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import './add_screen.css';

function MessagesScreen(props) {

    const dispatch = useDispatch();

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    const messagesList = useSelector(state => state.messagesList);
    const { messages, loading, error } = messagesList;

    const messageDelete = useSelector(state => state.messageDelete);
    const { success: successDelete } = messageDelete;

    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/profile po tek logini, e di a jom i logum permes userInfo(cookie pra)
            props.history.push("/login");
        }
        if(userInfo && !userInfo.isAdmin) {
            props.history.push('/notfound');
        }
        dispatch(listMessages());
        return () => {
    
        };
    }, [userInfo, successDelete])

    const deleteHandler = (messageId) => {
        dispatch(deleteMessage(messageId));
    }

    const confirmToDelete = (messageId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>A jeni i sigurtë se dëshironi me fshi? </h1>
                        <button onClick={onClose}>Anulo</button>
                        <button
                            onClick={() => {
                                deleteHandler(messageId)
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

    return <div className="profile" id="messages_screen">
        <div className="col-sm-12 col-md-12 profile-shpalljet content-margined" id="select2-drop">
            <h3 className="text-center text-muted">Lista e mesazheve ({messages ? messages.length : ''})</h3>
            {
                loading ? <div className="loader"></div> :
                error ? <div className="text-danger text-center alert-general">{error}</div> :
                messages.length === 0 ? <div className="alert alert-primary text-center alert-general" role="alert">
                        Ju nuk keni asnjë mesazh ende.
                    </div> :
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th>EMRI</th>
                                <th>TELEFONI</th>
                                <th>EMAIL</th>
                                <th>CITY</th>
                                <th>DESCRIPTION</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                    <tbody>
                        { 
                            messages.map(message => <tr key={message._id}>
                                <td>{message.name}</td>
                                <td>{message.telephone}</td>
                                <td>{message.email}</td>
                                <td>{message.city}</td>
                                <td id="desc_message">{message.description}</td>    
                                <td>
                                    <button type="button" onClick={() => confirmToDelete(message._id)} className="button_admin secondary">Delete</button>
                                </td>    
                                
                            </tr>)
                        }
                    </tbody>
                </table>
            }
        </div>
    </div>
}

export default MessagesScreen;