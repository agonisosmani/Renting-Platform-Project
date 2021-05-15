import axios from 'axios';

const listAllShpalljet = () => async (dispatch, getState) => {

   try {
    dispatch({ type: 'SHPALLJA_ALL_LIST_REQUEST' }); //sepse po dojm me bo nje reload atje ne faqe nese skemi t dhana, ktu hale skemi t dhana sepse hale nuk u ekzekutu axios, pra vetem e dergojm keshtu njje type
    const { userSignIn: { userInfo } } = getState();
    const shpalljet = await axios.get('http://localhost:5000/api/regjistroShpalljen/all', {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
      });
    dispatch({ type: 'SHPALLJA_ALL_LIST_SUCCESS', payload: shpalljet.data });
   } catch (error) {
    dispatch({ type: 'SHPALLJA_ALL_LIST_FAIL', payload: error.message });
   }
   
}

const listShpalljet = (
  category = '',
  komuna = '',
  // searchKeyword = '',
  sortOrder = ''
) => async (dispatch) => {
  try {
    dispatch({ type: 'SHPALLJA_LIST_REQUEST' });
    const { data } = await axios.get(
      'http://localhost:5000/api/regjistroShpalljen?category=' +
        category +
        '&komuna=' +
        komuna +
        // '&searchKeyword=' +
        // searchKeyword +
        '&sortOrder=' +
        sortOrder
    );
    dispatch({ type: 'SHPALLJA_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'SHPALLJA_LIST_FAIL', payload: error.message });
  }
};

const getMineShpalljet = () => async (dispatch, getState) => {
    try {
      dispatch({ type: 'SHPALLJA_MINE_REQUEST' });
      const { userSignIn: { userInfo } } = getState();
      const { data } = await axios.get("http://localhost:5000/api/regjistroShpalljen/mine", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: 'SHPALLJA_MINE_SUCCESS', payload: data })
    } catch (error) {
      dispatch({ type: 'SHPALLJA_MINE_FAIL', payload: error.message });
    }
  
}

const details = (shpalljaid) => async (dispatch) => {
  try {
    dispatch({type: 'SHPALLJA_DETAILS_REQUEST', payload: shpalljaid});
    const shpallja = await axios.get(`http://localhost:5000/api/regjistroShpalljen/${shpalljaid}`);
    dispatch({ type: 'SHPALLJA_DETAILS_SUCCESS', payload: shpallja.data });
  } catch (error) {
    dispatch({ type: 'SHPALLJA_DETAILS_FAIL', payload: error.message });
  }
}

const editShpallja = (shpalljaId) => async (dispatch, getState) => {
  try {
    dispatch({  type: 'EDIT_SHPALLJA_REQUEST' });
    const { userSignIn: { userInfo } } = getState();
    const { data } = await axios.put(`http://localhost:5000/api/regjistroShpalljen/${shpalljaId}`, {}, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: 'EDIT_SHPALLJA_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'EDIT_SHPALLJA_FAIL', payload: error.message });
  }
}

//per me bo edit shpalljen, kur t useri bon rating(me ylla tek shpallja details).
const rateShpallja = (shpalljaId, rating) => async (dispatch) => {
  try {
    dispatch({  type: 'RATE_SHPALLJA_REQUEST' });
    const { data } = await axios.put(`http://localhost:5000/api/regjistroShpalljen/rating/${shpalljaId}`, {rating});
    dispatch({ type: 'RATE_SHPALLJA_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'RATE_SHPALLJA_FAIL', payload: error.message });
  }
}

const deleteShpallja = (shpalljaId) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'DELETE_SHPALLJA_REQUEST' });
    const { userSignIn: { userInfo } } = getState();
    const { data } = await axios.delete(`http://localhost:5000/api/regjistroShpalljen/${shpalljaId}`, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: 'DELETE_SHPALLJA_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'DELETE_SHPALLJA_FAIL', payload: error.message });
  }
}

export { listShpalljet, listAllShpalljet, details, getMineShpalljet, editShpallja, rateShpallja, deleteShpallja };