import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import {
  userSigninReducer,
  userRegisterReducer,
  userBioReducer,
  userPicReducer
} from './reducers/userReducers';
import {
  createAddressReducer
} from './reducers/addressReducers';
import {
  allEventReducer,
  createEventReducer,
  singleEventReducer
} from './reducers/eventReducers';
import {
  allListReducer, createListReducer, singleListReducer
} from './reducers/listReducers';

import Cookie from 'js-cookie';
import { allMessagesReducer } from './reducers/messageReducer';

const userInfo = Cookie.getJSON('userInfo') || null;
const savedMessages = window.localStorage.getItem('messages');
let messages = [];

if(savedMessages){ 
    messages=JSON.parse(savedMessages);
}

const rootReducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  createAddress: createAddressReducer,
  createList: createListReducer,
  createEvent: createEventReducer,
  allList: allListReducer,
  allEvent: allEventReducer,
  allMessages: allMessagesReducer,
  singleList: singleListReducer,
  singleEvent: singleEventReducer,
  userBio: userBioReducer,
  userPic: userPicReducer
});

const initialState = {
  userSignin: { userInfo },
  allMessages: { messages }
};

const storeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  rootReducer,
  initialState,
  storeEnhancers(applyMiddleware(thunk))
);

export default store;