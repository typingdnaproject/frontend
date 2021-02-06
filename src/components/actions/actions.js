import axios from 'axios';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const FETCH_HACKERS_START = 'FETCH_HACKERS_START';
export const FETCH_HACKERS_SUCCESS = 'FETCH_HACKERS_SUCCESS';
export const FETCH_HACKERS_FAILURE = 'FETCH_HACKERS_FAILURE';

export const login = (creds) => (dispatch) => {
  dispatch({ type: LOGIN_START });
  return axios
    .post('http://localhost:5000/api/login', creds)
    .then((res) => {
      console.log('PAYLOAD', res.data);
      localStorage.setItem('token', res.data.payload);
      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE, payload: true });
    });
};
export const fetchHackers = () => (dispatch) => {
  dispatch({ type: FETCH_HACKERS_START });
  axios
    .get('http://localhost:5000/api/hackers', {
      headers: { Authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      dispatch({ type: FETCH_HACKERS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: FETCH_HACKERS_FAILURE, payload: err });
    });
};
