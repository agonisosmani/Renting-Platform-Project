import axios from 'axios';
import Cookie from 'js-cookie';

const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: 'USER_LIST_REQUEST' }); //sepse po dojm me bo nje reload atje ne faqe nese skemi t dhana, ktu hale skemi t dhana sepse hale nuk u ekzekutu axios, pra vetem e dergojm keshtu njje type
        const { userSignIn : { userInfo }} = getState();
        const users = await axios.get(`http://localhost:5000/api/users`, { headers: { 
            'Authorization': 'Bearer ' + userInfo.token
        }});
            
        dispatch({ type: 'USER_LIST_SUCCESS', payload: users.data });
        } catch (error) {
        dispatch({ type: 'USER_LIST_FAIL', payload: error.message });
    }
    
 }

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: 'USER_SIGNIN_REQUEST', payload: { email, password }});

    try {
        const { data } = await axios.post(`http://localhost:5000/api/users/signin`, {email, password});
        dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: 'USER_SIGNIN_FAIL', payload: error.response.data.error });
    }
}

const registeer = (name,email, password) => async (dispatch) => {
    dispatch({ type: 'USER_REGISTER_REQUEST', payload: { name, email, password }});

    try {
        const { data } = await axios.post(`http://localhost:5000/api/users/register`, {name,email, password});
        dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });
        // Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        console.log(error.response.data.error);
        dispatch({ type: 'USER_REGISTER_FAIL', payload: error.response.data.error });
    }
}

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
    dispatch({ type: 'USER_UPDATE_REQUEST', payload: { userId, name, email, password } });
    const { userSignIn : { userInfo }} = getState();
    try {
        const { data } = await axios.put(`http://localhost:5000/api/users/${userId}`,{ name, email, password }, {headers: { 
            'Authorization': 'Bearer ' + userInfo.token
        }});
        dispatch({ type: 'USER_UPDATE_SUCCESS', payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: 'USER_UPDATE_FAIL', payload: error.message });
    }
}

const deleteUser = (userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'DELETE_USER_REQUEST' });
      const { userSignIn: { userInfo } } = getState();
      const { data } = await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: 'DELETE_USER_SUCCESS', payload: data })
    } catch (error) {
      dispatch({ type: 'DELETE_USER_FAIL', payload: error.message });
    }
  }


const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: 'USER_LOGOUT' })
}

export { listUsers, signin, registeer, update, deleteUser, logout };