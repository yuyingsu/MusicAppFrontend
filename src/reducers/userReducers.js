import {
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    GET_BIO_REQUEST,
    GET_BIO_SUCCESS,
    GET_BIO_FAIL,
    UPDATE_BIO_REQUEST,
    UPDATE_BIO_SUCCESS,
    UPDATE_BIO_FAIL,
    GET_PIC_REQUEST,
    GET_PIC_SUCCESS,
    GET_PIC_FAIL,
    UPLOAD_PIC_REQUEST,
    UPLOAD_PIC_SUCCESS,
    UPLOAD_PIC_FAIL,
  } from "../constants/userConstants";
  

  function userRegisterReducer(state = {}, action) {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload, success: true };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  function userSigninReducer(state = {}, action) {
    switch (action.type) {
      case USER_SIGNIN_REQUEST:
        return { loading: true };
      case USER_SIGNIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_SIGNIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT_REQUEST:
          return { loading: true };
      case USER_LOGOUT_SUCCESS:
          return { };
      case USER_LOGOUT_FAIL:
          return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  function userBioReducer(state = {}, action) {
    switch (action.type) {
      case GET_BIO_REQUEST:
        return { loading: true };
      case GET_BIO_SUCCESS:
        return { loading: false, bio: action.payload };
      case GET_BIO_FAIL:
        return { loading: false, error: action.payload };
      case UPDATE_BIO_REQUEST:
          return { loading: true };
      case UPDATE_BIO_SUCCESS:
          return { loading: false, bio: action.payload };
      case UPDATE_BIO_FAIL:
          return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function userPicReducer(state = {}, action) {
    switch (action.type) {
      case GET_PIC_REQUEST:
        return { loading: true };
      case GET_PIC_SUCCESS:
        return { loading: false, pic: action.payload };
      case GET_PIC_FAIL:
        return { loading: false, error: action.payload };
      case UPLOAD_PIC_REQUEST:
          return { loading: true };
      case UPLOAD_PIC_SUCCESS:
          return { loading: false, pic: action.payload['image'] };
      case UPLOAD_PIC_FAIL:
          return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  export {
    userRegisterReducer,
    userSigninReducer,
    userBioReducer,
    userPicReducer
  }