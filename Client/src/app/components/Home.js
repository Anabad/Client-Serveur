import React from "react";
import { browserHistory } from "react-router";

import {CarInfo} from "./CarInfo";

export class Home extends React.Component {
    onLogout() {
      browserHistory.push("/login");
    }

    render() {
        return (
            <div>
                <div className="top-bar" id="realEstateMenu">
                    <div className="top-bar-right">
                        <ul className="menu">
                            <li><a href="#">My Account</a></li>
                            <li><a className="button" onClick={this.onLogout}>Log Out</a></li>
                        </ul>
                    </div>
                </div>
                <br/>
                    <div className="row">

                        <div className="medium-7 large-6 columns">
                            <h1>Close Your Eyes and Open Your Mind</h1>
                            <p className="subheader">There is beauty in space, and it is orderly. There is no weather, and there is regularity. It is predictable. Everything in space obeys the laws of physics. If you know these laws, and obey them, space will treat you kindly.</p>
                            <button className="button">Take a Tour</button>
                            <button className="button">Start a free trial</button>
                        </div>

                        <div className="show-for-large large-3 columns">
                            <img src="http://placehold.it/400x370&text=PSR1257 + 12 C" alt="picture of space"/>
                        </div>

                        <div className="medium-5 large-3 columns">
                            <div className="callout secondary">
                                <form>
                                    <div className="row">
                                        <div className="small-12 columns">
                                            <label>Find Your Dream Planet
                                                <input type="text" placeholder="Search destinations"/>
                                            </label>
                                        </div>
                                        <div className="small-12 columns">
                                            <label>Number of Moons
                                                <input type="number" placeholder="Moons required"/>
                                            </label>
                                            <button type="submit" className="button">Search Now!</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                    <div className="row column">
                        <hr/>
                    </div>

                    <div className="row column">
                        <p className="lead">Trending Planetary Destinations</p>
                    </div>

                    <div className="row small-up-1 medium-up-2 large-up-3">
                        <CarInfo number={"1"}/>

                    </div>

                    <div className="row column">
                        <a className="button hollow expanded">Load More</a>
                    </div>
            </div>
        );
    }
}