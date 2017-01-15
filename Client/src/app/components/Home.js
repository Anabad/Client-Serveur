import React from "react";
import { browserHistory, Link } from "react-router";
import Request from 'react-http-request';

import {CarInfo} from "./CarInfo";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCarClicked: false,
      username: "",
      password: "",
      userId: ""
    };
    this.addCar = this.addCar.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.state[event.target.id] = event.target.value;
    console.log(this.state);
  }



  onLogout() {
      browserHistory.push("/login");
    }

    addCar() {
      this.setState({addCarClicked: true});
    }

    render() {
        return (
            <div>
                <div className="top-bar" id="realEstateMenu">
                    <div className="top-bar-right">
                        <ul className="menu">
                            <li><Link to={"/user"}>My Account</Link></li>
                            <li><Link to={"/vehicles"}>My Vehicles</Link></li>
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
                                          <p>Add a car</p>
                                            <label>License
                                                <input type="text" placeholder="License"/>
                                            </label>
                                        </div>
                                        <div className="small-12 columns">
                                            <label>Position
                                                <input type="number" placeholder="Position"/>
                                            </label>
                                            <button className="button" onClick={this.addCar}>Add!</button>
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
                        <p className="lead">Cars :</p>
                    </div>

                    <div className="row small-up-1 medium-up-2 large-up-3">
                      <Request
                          url={'http://localhost:3000/api/vehicles'}
                          method='get'
                          accept='application/vnd.api+json'
                          verbose={true}
                        >
                            {
                              ({error, result, loading}) => {
                                if (loading) {
                                  return <div>loading...</div>;
                                } else {
                                  //Create a JSON object
                                  const vehicleArray = JSON.parse(result.text);

                                  //Array to return
                                  var returnValue =[];

                                  //For each vehicle in the result
                                  for( var i=0;i<vehicleArray.data.length;i++)
                                  {
                                    //Create a new car info component, key is needed for React to render an array
                                    returnValue.push(<CarInfo key={i.toString()}
                                               number={i}
                                               license={vehicleArray.data[i].attributes.license}
                                               position={vehicleArray.data[i].attributes.position} />);
                                  }
                                  return<span>{returnValue}</span>;
                                }
                              }
                            }
                        </Request>

                    </div>

                    <div className="row column">
                        <a className="button hollow expanded">Load More</a>
                    </div>

              {/*Requests*/}
              { /*this.state.addCarClicked ?
                <Request
                  url={'http://localhost:3000/api/vehicles'}
                  method='post'
                  accept='application/vnd.api+json'
                  verbose={true}
                  send={{"data": {
                            "type": "vehicles",
                              "attributes":
                              {
                               "license": "license",
                               "position" : "Ivry"
                               }
                             }}}
                >
                  {
                    ({error, result, loading}) => {
                      if (loading) {
                        return <div>loading...</div>;
                      } else {
                        return null;
                      }
                    }
                  }
                </Request> :
                <span></span>*/
              }

            </div>
        );
    }
}