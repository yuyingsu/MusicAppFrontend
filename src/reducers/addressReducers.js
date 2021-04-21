import {
    CREATE_ADDRESS_REQUEST,
    CREATE_ADDRESS_SUCCESS,
    CREATE_ADDRESS_FAIL
  } from "../constants/addressConstants";

  function createAddressReducer(state = {}, action) {
    switch (action.type) {
      case CREATE_ADDRESS_REQUEST:
        return { loading: true };
      case CREATE_ADDRESS_SUCCESS:
        return { loading: false, addressId: action.payload['id'] };
      case CREATE_ADDRESS_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  export {
    createAddressReducer,
  }