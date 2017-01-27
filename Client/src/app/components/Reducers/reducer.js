import {browserHistory} from 'react-router';

const initState = {
  user: {username: '', userId: ''},
  isLoggedIn: false
};

export default function auth(state = initState, action) {
  if (action.type === 'LOGIN') {
    state.isLoggedIn = true;
    state.user = action.user;
    browserHistory.push(`/home`);
    return state;
  } else if (action.type === 'LOGOUT') {
    state.isLoggedIn = false;
    state.user = '';
    browserHistory.push(`/login`);
    return state;
  }

  return state;
}
