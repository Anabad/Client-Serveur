import {browserHistory} from 'react-router';

const initState = {
	user: {username: '', userId: ''},
	isLoggedIn: false
};

export default function login(state = initState, action) {
	if (action.type == 'LOGIN') {
		state.isLoggedIn = true;
		state.user = action.user;
		browserHistory.push(`/home`);
		return state;
	}

	return state;
}
