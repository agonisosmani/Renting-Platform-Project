import React, { useState, useEffect } from 'react';
import { listContacts } from '../../actions/contactActions';
import { useDispatch, useSelector } from 'react-redux';

import './add_screen.css';

function CategoriesScreen(props) {

    const dispatch = useDispatch();

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    const contactsList = useSelector(state => state.contactsList);
    const { contacts, loading: loadingContacts, error: errorContacts } = contactsList;

    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/profile po tek logini, e di a jom i logum permes userInfo(cookie pra)
            props.history.push("/login");
        }
        if(userInfo && !userInfo.isAdmin) {
            props.history.push('/notfound');
        }
        dispatch(listContacts());
        return () => {
    
        };
    }, [userInfo])

    return <div className="profile" id="messages_screen">
        <div className="col-sm-12 col-md-12 profile-shpalljet content-margined" id="select2-drop">
            <h3 className="text-center text-muted">Lista e kontakteve ({contacts ? contacts.length : ''})</h3>
            {
                loadingContacts ? <div className="loader"></div> :
                errorContacts ? <div className="text-danger text-center alert-general">{errorContacts} </div> :
                contacts.length === 0 ? <div className="alert alert-primary text-center alert-general" role="alert">
                        Ju nuk keni postuar asnje kontakt ende.
                    </div> :
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th>EMRI</th>
                                <th>EMAIL</th>
                                <th>SUBJECT</th>
                                <th>MESSAGE</th>
                            </tr>
                        </thead>
                    <tbody>
                        { 
                            contacts.map(contact => <tr key={contact._id}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.subject}</td>
                                <td>{contact.message}</td>        
                            </tr>)
                        }
                    </tbody>
                </table>
            }
        </div>
    </div>
}

export default CategoriesScreen;