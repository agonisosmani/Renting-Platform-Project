import axios from 'axios';

const listCategories = (limit,skip) => async (dispatch) => {

   try {
    dispatch({ type: 'CATEGORY_LIST_REQUEST' }); //sepse po dojm me bo nje reload atje ne faqe nese skemi t dhana, ktu hale skemi t dhana sepse hale nuk u ekzekutu axios, pra vetem e dergojm keshtu njje type

    const categories = await axios.get(`http://localhost:5000/api/categories?limit=${limit}&skip=${skip}`);

    dispatch({ type: 'CATEGORY_LIST_SUCCESS', payload: categories.data });
   } catch (error) {
    dispatch({ type: 'CATEGORY_LIST_FAIL', payload: error.message });
   }
   
}

//kjo metode na kthen length-in e tabeles category -> na vyn n home page per category slider me dit kur me shfaq kur jo butoni next aty
const categoriessLength = () => async (dispatch) => {

  try {
   dispatch({ type: 'CATEGORY_LENGTH_REQUEST' }); //sepse po dojm me bo nje reload atje ne faqe nese skemi t dhana, ktu hale skemi t dhana sepse hale nuk u ekzekutu axios, pra vetem e dergojm keshtu njje type

   const categories = await axios.get(`http://localhost:5000/api/categories/categoriesNumber`);

   dispatch({ type: 'CATEGORY_LENGTH_SUCCESS', payload: categories.data });
  } catch (error) {
   dispatch({ type: 'CATEGORY_LENGTH_FAIL', payload: error.message });
  }
  
}

const deleteCategory = (categoryId) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'DELETE_CATEGORY_REQUEST' });
    const { userSignIn: { userInfo } } = getState();
    const { data } = await axios.delete(`http://localhost:5000/api/categories/${categoryId}`, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: 'DELETE_CATEGORY_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'DELETE_CATEGORY_FAIL', payload: error.message });
  }
}

export { listCategories, categoriessLength, deleteCategory };