import React, { useEffect } from 'react';
import { listMembers, deleteMember } from '../../actions/memberAction';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import './add_screen.css';

function MembersScreen(props) {
 
    const dispatch = useDispatch();

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    const membersList = useSelector(state => state.membersList);
    const { members, loading: loadingMembers, error: errorMembers } = membersList;

    const memberDelete = useSelector(state => state.memberDelete);
    const { success: successDelete } = memberDelete;

    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/profile po tek logini, e di a jom i logum permes userInfo(cookie pra)
            props.history.push("/login");
        }
        if(userInfo && !userInfo.isAdmin) {
            props.history.push('/notfound');
        }
       
        dispatch(listMembers());
        return () => {
    
        };
    }, [userInfo, successDelete])

    const deleteHandler = (memberId) => {
        dispatch(deleteMember(memberId));
    }

    const confirmToDelete = (memberId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>A jeni i sigurtë se dëshironi me fshi? </h1>
                        <button onClick={onClose}>Anulo</button>
                        <button
                            onClick={() => {
                                deleteHandler(memberId)
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
                <h3 className="text-center text-muted">Lista e Members Reviews ({members ? members.length : ''})</h3>
                {
                    loadingMembers ? <div className="loader"></div>:
                    errorMembers ? <div className="text-danger text-center alert-general">{errorMembers} </div> :
                    members.length === 0 ? <div className="alert alert-primary text-center alert-general" role="alert">
                            Ju nuk keni postuar asnje member reviews ende.
                        </div> :
                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th>EMRI</th>
                                    <th>Description</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                        <tbody>
                            {
                                members.map(member => <tr key={member._id}>
                                    <td>{member.name}</td>
                                    <td>{member.description}</td>
                                    <td>
                                        <button type="button" onClick={() => confirmToDelete(member._id)} className="button secondary-delete">Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                }
            </div>
    </div>
}

export default MembersScreen;