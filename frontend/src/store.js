import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { combineReducers, createStore, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { contactCreateReducer } from './reducers/contactReducers';
import { shpalljaSaveReducer, shpalljaListReducer, shpalljaAllListReducer, shpalljaDetailsReducer, shpalljetMineReducer, editShpalljaReducer, rateShpalljaReducer, deleteShpalljaReducer } from './reducers/shpalljaReducers';
import { userListReducer, userSignInReducer, userRegisterReducer, userUpdateReducer, deleteUserReducer } from './reducers/userReducers';
import { categoryListReducer, categoryLengthReducer, deleteCategoryReducer } from './reducers/categoryReducers';
import { contactListReducer } from './reducers/contactReducers';
import { messageListReducer, deleteMessageReducer } from './reducers/shpalljaNotFoundReducers';
import { memberListReducer, deleteMemberReducer, memberLengthReducer } from './reducers/memberReducers';
import { komunaListReducer, createKomunReducer, deleteKomunaReducer } from './reducers/komunaReducers';

const userInfo = Cookie.getJSON("userInfo") || null; //null sepse nese skemi elemente ne userInfo me qene by default e zbrazt

const initialState = { userSignIn: { userInfo }};
const reducer = combineReducers({
    form: formReducer,
    contactReducer: contactCreateReducer,
    shpalljaReducer: shpalljaSaveReducer,
    usersList: userListReducer,
    userSignIn: userSignInReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    userDelete: deleteUserReducer,
    shpalljaList: shpalljaListReducer,
    shpalljaAllList: shpalljaAllListReducer,
    shpalljaDetails: shpalljaDetailsReducer,
    myShpalljetList: shpalljetMineReducer,
    shpalljaDelete: deleteShpalljaReducer,
    shpalljaEdit: editShpalljaReducer,
    shpalljaRate: rateShpalljaReducer,
    categoriesList: categoryListReducer,
    categoryLength: categoryLengthReducer,
    categoryDelete: deleteCategoryReducer,
    contactsList: contactListReducer,
    messagesList: messageListReducer,
    messageDelete: deleteMessageReducer,
    membersList: memberListReducer,
    memberDelete: deleteMemberReducer,
    members_Length: memberLengthReducer,
    add_komuna: createKomunReducer,
    komunatList: komunaListReducer,
    komunaDelete: deleteKomunaReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;