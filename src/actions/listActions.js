import Axios from "axios";
import {
  CREATE_LIST_REQUEST,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,
  ALL_LIST_REQUEST,
  ALL_LIST_SUCCESS,
  ALL_LIST_FAIL,
  SINGLE_LIST_REQUEST,
  SINGLE_LIST_SUCCESS,
  SINGLE_LIST_FAIL
} from "../constants/listConstants";

const createList = (title, songs) => async (dispatch, getState) => {
    try {
      const { userSignin: { userInfo } } = getState();
      const user_id = userInfo.user_id;
      dispatch({ type: CREATE_LIST_REQUEST, payload: {title, user_id, songs} });
      const { data } = await Axios.post("https://tangerinemusic.herokuapp.com/createlist", { title, user_id, songs },{
        headers: {
            "Authorization": ' Bearer ' + userInfo.access_token
          }
      });
      dispatch({ type: CREATE_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: CREATE_LIST_FAIL, payload: error.message });
    }
  }

  const allLists = (page, searchTerm) => async (dispatch) => {
    try {
      dispatch({ type: ALL_LIST_REQUEST, payload: {} });
      const { data } = await Axios.get("https://tangerinemusic.herokuapp.com/alllists/"+page+"?term="+searchTerm, {},{});
      dispatch({ type: ALL_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: ALL_LIST_FAIL, payload: error.message });
    }
  }

  const getList = (id) => async (dispatch) => {
    try {
      
      dispatch({ type: SINGLE_LIST_REQUEST, payload: {} });
      const { data } = await Axios.get("https://tangerinemusic.herokuapp.com/list/"+id, {},{});
      dispatch({ type: SINGLE_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: SINGLE_LIST_FAIL, payload: error.message });
    }
  }


export {
  createList,
  allLists,
  getList
};

