import axios from 'axios';

const listMessages = () => async (dispatch, getState) => {

  try {
    dispatch({ type: 'SHPALLJA_NOT_FOUND_LIST_REQUEST' }); //sepse po dojm me bo nje reload atje ne faqe nese skemi t dhana, ktu hale skemi t dhana sepse hale nuk u ekzekutu axios, pra vetem e dergojm keshtu njje type
    const { userSignIn: { userInfo } } = getState();
    const messages = await axios.get('http://localhost:5000/api/shpalljaNotFound', {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
      });

   dispatch({ type: 'SHPALLJA_NOT_FOUND_LIST_SUCCESS', payload: messages.data });
  } catch (error) {
   dispatch({ type: 'SHPALLJA_NOT_FOUND_LIST_FAIL', payload: error.message });
  }
  
}

const deleteMessage = (messageId) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'DELETE_MESSAGE_REQUEST' });
    const { userSignIn: { userInfo } } = getState();
    const { data } = await axios.delete(`http://localhost:5000/api/shpalljaNotFound/${messageId}`, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: 'DELETE_MESSAGE_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'DELETE_MESSAGE_FAIL', payload: error.message });
  }
}

export { listMessages, deleteMessage };