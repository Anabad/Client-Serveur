/* eslint-disable no-unused-vars */
/* eslint-disable import/default */
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Root from './components/root';
import Home from './components/home';
import User from './components/user';
import Login from './components/login';
import Reducer from './components/Reducers/reducer';
/* eslint-enable */

const store = createStore(Reducer);

class App extends React.Component {
  render() {
    return (
            <Provider store={store}>
            <Router history={browserHistory}>
                <Route path={'/'} component={Root} >
                    <IndexRoute component={Login} />
                    <Route path={'user'} component={User} />
                    <Route path={'home'} component={Home} />
                    <Route path={'login'} component={Login} />
                </Route>
                <Route path={'home-single'} component={Home}/>
            </Router>
            </Provider>
    );
  }
}
// eslint-disable-next-line no-undef
render(<App />, window.document.getElementById('app'));
