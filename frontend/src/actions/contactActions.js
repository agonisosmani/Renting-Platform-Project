import axios from 'axios';

const listContacts = () => async (dispatch, getState) => {

  try {
    dispatch({ type: 'CONTACTS_LIST_REQUEST' }); //sepse po dojm me bo nje reload atje ne faqe nese skemi t dhana, ktu hale skemi t dhana sepse hale nuk u ekzekutu axios, pra vetem e dergojm keshtu njje type
    const { userSignIn: { userInfo } } = getState();
    const contacts = await axios.get('http://localhost:5000/api/contacts', {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
      });

   dispatch({ type: 'CONTACTS_LIST_SUCCESS', payload: contacts.data });
  } catch (error) {
   dispatch({ type: 'CONTACTS_LIST_FAIL', payload: error.message });
  }
  
}

const sendContactData = (data) => async (dispatch) => {
  try {
      dispatch({ type: 'CONTACT_CREATE_REQUEST', payload: data });
      const { data: { data: newContact } } = await axios.post("http://localhost:5000/api/contacts/register", data);
      dispatch({ type: 'CONTACT_CREATE_SUCCESS', payload: newContact });
    } catch (error) {
      dispatch({ type: 'CONTACT_CREATE_FAIL', payload: error.message });
  }
}

export { sendContactData, listContacts };