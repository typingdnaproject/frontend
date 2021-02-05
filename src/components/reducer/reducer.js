import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_HACKERS_START,
  FETCH_HACKERS_SUCCESS,
  FETCH_HACKERS_FAILURE,
} from '../actions/actions';

const initialState = {
  hackers: [],
  loggingIn: false,
  error: null,
  loading: true,
  token: localStorage.getItem('token'),
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      console.log('STORE', state);
      console.log('action', action);
      return {
        ...state,
        loggingIn: true,
        error: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        error: false,
        token: localStorage.getItem('token'),
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.payload,
      };
    case FETCH_HACKERS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_HACKERS_SUCCESS:
      return {
        ...state,
        hackers: [...state.hackers, ...action.payload],
        loading: false,
        error: null,
      };
    case FETCH_HACKERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
