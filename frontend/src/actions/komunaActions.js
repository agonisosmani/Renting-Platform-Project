import axios from 'axios';

const listKomunat = () => async (dispatch) => {

   try {
    dispatch({ type: 'KOMUNA_LIST_REQUEST' }); //sepse po dojm me bo nje reload atje ne faqe nese skemi t dhana, ktu hale skemi t dhana sepse hale nuk u ekzekutu axios, pra vetem e dergojm keshtu njje type

    const categories = await axios.get(`http://localhost:5000/api/komunat`);

    dispatch({ type: 'KOMUNA_LIST_SUCCESS', payload: categories.data });
   } catch (error) {
    dispatch({ type: 'KOMUNA_LIST_FAIL', payload: error.message });
   }
   
}

const create = (name) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'KOMUNA_CREATE_REQUEST', payload: name });
        const { userSignIn: { userInfo } } = getState();
        const { data: { data: newKomuna } } = await axios.post("http://localhost:5000/api/komunat", {name}, {
            headers:
              { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: 'KOMUNA_CREATE_SUCCESS', payload: newKomuna });
      } catch (error) {
        dispatch({ type: 'KOMUNA_CREATE_FAIL', payload: error.message });
    }
  }

const deleteKomuna = (komunaId) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'DELETE_KOMUNA_REQUEST' });
    const { userSignIn: { userInfo } } = getState();
    const { data } = await axios.delete(`http://localhost:5000/api/komunat/${komunaId}`, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: 'DELETE_KOMUNA_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'DELETE_KOMUNA_FAIL', payload: error.message });
  }
}

export { listKomunat, create, deleteKomuna };