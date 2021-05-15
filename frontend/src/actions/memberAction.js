import axios from 'axios';

const listMembers = (limit,skip) => async (dispatch) => {

   try {
    dispatch({ type: 'MEMBER_LIST_REQUEST' }); //sepse po dojm me bo nje reload atje ne faqe nese skemi t dhana, ktu hale skemi t dhana sepse hale nuk u ekzekutu axios, pra vetem e dergojm keshtu njje type

    const members = await axios.get(`http://localhost:5000/api/members?limit=${limit}&skip=${skip}`);

    dispatch({ type: 'MEMBER_LIST_SUCCESS', payload: members.data });
   } catch (error) {
    dispatch({ type: 'MEMBER_LIST_FAIL', payload: error.message });
   }
   
}
//kjo metode na kthen length-in e tabeles member -> na vyn n home page per member slider me dit kur me shfaq kur jo butoni next aty
const members_length = () => async (dispatch) => {

   try {
    dispatch({ type: 'MEMBER_LENGTH_REQUEST' }); //sepse po dojm me bo nje reload atje ne faqe nese skemi t dhana, ktu hale skemi t dhana sepse hale nuk u ekzekutu axios, pra vetem e dergojm keshtu njje type
 
    const categories = await axios.get(`http://localhost:5000/api/members/membersNumber`);
 
    dispatch({ type: 'MEMBER_LENGTH_SUCCESS', payload: categories.data });
   } catch (error) {
    dispatch({ type: 'MEMBER_LENGTH_FAIL', payload: error.message });
   }
   
 }
const deleteMember = (memberId) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'DELETE_MEMBER_REQUEST' });
    const { userSignIn: { userInfo } } = getState();
    const { data } = await axios.delete(`http://localhost:5000/api/members/${memberId}`, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: 'DELETE_MEMBER_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'DELETE_MEMBER_FAIL', payload: error.message });
  }
}

export { listMembers, deleteMember, members_length  }