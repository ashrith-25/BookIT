import { createStore } from "redux";

const initialState = {
  email: '',
  userdetails: {},
  usersCount: 0,
  busesCount: 0,
  originalbuses: [],
  filters: [],
  filteredbuses: []
};

const reducer = (state = initialState, action) => {

  if(action.type === 'email') {
    return {
      ...state,
      email: action.payload
    }
  }

  if(action.type === "userdetails") {
    return {
      ...state,
      userdetails: action.payload
    }
  }

  if (action.type === "usersCount") {
    return {
      ...state,
      usersCount: action.payload,
    };
  }

  if (action.type === "busesCount") {
    return {
      ...state,
      busesCount: action.payload,
    };
  }

  if(action.type === "originalbuses") {
    return {
      ...state,
      originalbuses: action.payload
    }
  }

  if(action.type === "filters") {
    return {
      ...state,
      filters: action.payload
    }
  }
  if(action.type === "filteredbuses") {
    return {
      ...state,
      filteredbuses: action.payload
    }
  }

  return state;
};

const store = createStore(reducer);

export default store;
