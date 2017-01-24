import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import {Root} from "./components/Root";
import Home from "./components/Home";
import {User} from "./components/User";
import Login from "./components/Login";
import Vehicles from "./components/Vehicles";
import Reducer from './components/Reducers/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(Reducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
            <Router history={browserHistory}>
                <Route path={"/"} component={Root} >
                    <IndexRoute component={Login} />
                    <Route path={"user"} component={User} />
                    <Route path={"home"} component={Home} />
                    <Route path={"login"} component={Login} />
                    <Route path={"vehicles"} component={Vehicles}/>
                </Route>
                <Route path={"home-single"} component={Home}/>
            </Router>
            </Provider>
        );
    }
}

render(<App />, window.document.getElementById('app'));