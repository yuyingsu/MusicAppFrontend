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

  function createListReducer(state = {}, action) {
    switch (action.type) {
      case CREATE_LIST_REQUEST:
        return { loading: true };
      case CREATE_LIST_SUCCESS:
        return { loading: false};
      case CREATE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function allListReducer(state = {}, action) {
    switch (action.type) {
      case ALL_LIST_REQUEST:
        return { loading: true };
      case ALL_LIST_SUCCESS:
        return { loading: false, lists: action.payload, count: action.payload.count};
      case ALL_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function singleListReducer(state = {}, action) {
    switch (action.type) {
      case SINGLE_LIST_REQUEST:
        return { loading: true };
      case SINGLE_LIST_SUCCESS:
        return { loading: false, list: action.payload };
      case SINGLE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  export {
    createListReducer,
    allListReducer,
    singleListReducer
  }