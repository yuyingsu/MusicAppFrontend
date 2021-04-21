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

  function createEventReducer(state = {}, action) {
    switch (action.type) {
      case CREATE_EVENT_REQUEST:
        return { loading: true };
      case CREATE_EVENT_SUCCESS:
        return { loading: false};
      case CREATE_EVENT_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function allEventReducer(state = {}, action) {
    switch (action.type) {
      case ALL_EVENT_REQUEST:
        return { loading: true };
      case ALL_EVENT_SUCCESS:
        return { loading: false, events: action.payload, count: action.payload.count};
      case ALL_EVENT_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function singleEventReducer(state = {}, action) {
    switch (action.type) {
      case SINGLE_EVENT_REQUEST:
        return { loading: true };
      case SINGLE_EVENT_SUCCESS:
        let temp = [];
        action.payload['event'].users.map((e)=>{
            temp.push({id:e['id'], username:e['username']});
          });
        console.log(temp);
        return { loading: false, event: action.payload['event'], users: temp, address: action.payload['address'] };
      case SINGLE_EVENT_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  export {
    createEventReducer,
    allEventReducer,
    singleEventReducer
  }