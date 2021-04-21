import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
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
  UPLOAD_PIC_REQUEST,
  UPLOAD_PIC_SUCCESS,
  UPLOAD_PIC_FAIL,
  GET_PIC_REQUEST,
  GET_PIC_SUCCESS,
  GET_PIC_FAIL,
} from "../constants/userConstants";

const logout = () => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    await Axios.post("https://tangerinemusic.herokuapp.com/signout", {}, {
        headers: {
          "Authorization": ' Bearer ' + userInfo.access_token
        }
      });
    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.message });
  }
}

const register = (username, email, password, bio, addressId) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { username, email, password, bio, addressId } });
  try {
    const { data } = await Axios.post("https://tangerinemusic.herokuapp.com/register", { username, email, password, bio, address_id: addressId});
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data['message']);
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data['message'] });
  }
}

const signin = (username, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
  try {
    const { data } = await Axios.post("https://tangerinemusic.herokuapp.com/signin", { username, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
}
  catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data['message'] });
  }
}

const updateBio = (bio) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  const user_id = userInfo.user_id;
  dispatch({ type: UPDATE_BIO_REQUEST});
  try {
    const { data } = await Axios.put("https://tangerinemusic.herokuapp.com/updatebio/"+user_id, { bio }, {
      headers: {
        "Authorization": ' Bearer ' + userInfo.access_token
      }
    });
    dispatch({ type: UPDATE_BIO_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response)
    dispatch({ type: UPDATE_BIO_FAIL, payload: error.response.data['message'] });
  }
}

const getBio = (user_id) => async (dispatch) => {
  dispatch({ type: GET_BIO_REQUEST});
  try {
    const { data } = await Axios.get("https://tangerinemusic.herokuapp.com/userbio/"+user_id, {});
    dispatch({ type: GET_BIO_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response)
    dispatch({ type: GET_BIO_FAIL, payload: error.message });
  }
}

const uploadPic = (data1) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: UPLOAD_PIC_REQUEST});
  try {
    const { data } = await Axios.put("https://tangerinemusic.herokuapp.com/upload/avatar", data1, {
      headers: {
      "Authorization": ' Bearer ' + userInfo.access_token,
      'Content-Type': 'multipart/form-data'
    }
    })
    dispatch({ type: UPLOAD_PIC_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response)
    dispatch({ type: UPLOAD_PIC_FAIL, payload: error.message });
  }
}

const userPic = (user_id) => async (dispatch, getState) => {
  dispatch({ type: GET_PIC_REQUEST});
  try {
    const { data } = await Axios.get("https://tangerinemusic.herokuapp.com/avatar/"+user_id, {});
    dispatch({ type: GET_PIC_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: GET_PIC_FAIL, payload: error.message });
  }
}

export {
  logout,
  register,
  signin,
  updateBio,
  getBio,
  uploadPic,
  userPic
};