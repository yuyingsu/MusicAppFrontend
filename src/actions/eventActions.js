import Axios from "axios";
import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  ALL_EVENT_REQUEST,
  ALL_EVENT_SUCCESS,
  ALL_EVENT_FAIL,
  SINGLE_EVENT_REQUEST,
  SINGLE_EVENT_SUCCESS,
  SINGLE_EVENT_FAIL
} from "../constants/eventConstants";

const createEvent = (streetName, city, state, zip, headline, description, date, user_id) => async (dispatch, getState) => {
    try {
      const { userSignin: { userInfo } } = getState();
      dispatch({ type: CREATE_EVENT_REQUEST, payload: { streetName, city, state, zip, headline, description, date, user_id } });
      const { data } = await Axios.post("https://tangerinemusic.herokuapp.com/createevent", { streetName, city, state, zip, headline, description, date, user_id },{
        headers: {
            "Authorization": ' Bearer ' + userInfo.access_token
          }
      });
      dispatch({ type: CREATE_EVENT_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: CREATE_EVENT_FAIL, payload: error.message });
    }
  }

  const allEvents = (page, searchTerm) => async (dispatch) => {
    try {
      dispatch({ type: ALL_EVENT_REQUEST, payload: {} });
      const { data } = await Axios.get("https://tangerinemusic.herokuapp.com/events/"+page+"?term="+searchTerm, {},{});
      dispatch({ type: ALL_EVENT_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: ALL_EVENT_FAIL, payload: error.message });
    }
  }

  const getEvent = (id) => async (dispatch) => {
    try {
      
      dispatch({ type: SINGLE_EVENT_REQUEST, payload: {} });
      const { data } = await Axios.get("https://tangerinemusic.herokuapp.com/event/"+id, {},{});
      dispatch({ type: SINGLE_EVENT_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: SINGLE_EVENT_FAIL, payload: error.message });
    }
  }


export {
  createEvent,
  allEvents,
  getEvent
};

