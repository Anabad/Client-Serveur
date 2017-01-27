import React from 'react';
// eslint-disable-next-line no-unused-vars
import {browserHistory, Link, router} from 'react-router';
// eslint-disable-next-line no-unused-vars
import Request from 'react-http-request';
import {connect} from 'react-redux';
// eslint-disable-next-line no-unused-vars
import CarInfo from './car-info';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLicense: '',
      inputOrigin: '',
      inputDestination: '',
      user: '',
      update: 0,
      numberOfVehicles: 0,
        vehicleArray: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addCarRequest = this.addCarRequest.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  // Handle the changes of input fields
  handleChange(event) {
    this.state[event.target.id] = event.target.value;
  }

  onLogout() {
    browserHistory.push('/login');
  }

  render() {
    return (
            <div>
                <div className="top-bar" id="realEstateMenu">
                    <div className="top-bar-right">
                        <ul className="menu">
                            <li><Link to={'/user'}>My Account</Link></li>
                            <li><a className="button" onClick={this.onLogout}>Log Out</a></li>
                        </ul>
                    </div>
                </div>
                <br/>
                    <div className="row">

                        <div className="medium-7 large-6 columns">
                            <h1>Manage your awesome fleet</h1>
                            <p className="subheader">Create VroomVrooms, delete VroomVrooms and send them wherever you want.</p>
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
                                                <input id="inputLicense" type="text" placeholder="License" onChange={this.handleChange}/>
                                            </label>
                                        </div>
                                        <div className="small-12 columns">
                                            <label>Origin
                                                <input id="inputOrigin" type="text" placeholder="Origin" onChange={this.handleChange}/>
                                            </label>
                                            <label>Destination
                                              <input id="inputDestination" type="text" placeholder="Destination" onChange={this.handleChange}/>
                                            </label>
                                            <button className="button" onClick={this.addCarRequest}>Add!</button>
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
                <div>
                      <Request
                          url={'http://localhost:3000/api/users/' + this.props.user.userId + '?include=vehicles'}
                          method="get"
                          accept="application/vnd.api+json"
                          verbose={true}
                        >
                            {
                              ({result, loading}) => {
                                if (loading) {
                                  return <div>loading...</div>;
                                }
                                  // Create a JSON object
                                this.state.vehicleArray = JSON.parse(result.text);
                                this.state.numberOfVehicles = this.state.vehicleArray.included.length;

                                  // Array of carInfo components to return
                                const returnValue = [];

                                  // For each vehicle in the result
                                for (let i = 0; i < this.state.vehicleArray.included.length; i++) {
                                    // Create a new car info component, key is needed for React to render an array
                                  returnValue.push(<CarInfo key={i.toString()}
                                               number={i}
                                               license={this.state.vehicleArray.included[i].attributes.license}
                                               origin={this.state.vehicleArray.included[i].attributes.origin}
                                               destination={this.state.vehicleArray.included[i].attributes.destination}
                                               startTime={this.state.vehicleArray.included[i].attributes.startTime}
                                               duration={this.state.vehicleArray.included[i].attributes.duration}
                                               id={this.state.vehicleArray.included[i].id}
                                                            callback = {this.refresh}
                                    />);
                                }
                                  return <div className="row small-up-1 medium-up-1 large-up-2">{returnValue}</div>;
                              }
                            }
                        </Request>

                    </div>
                    <div className="row column">
                        <a className="button hollow expanded">Load More</a>
                    </div>
            </div>
    );
  }

  // Send the request to the server to add a new car
  addCarRequest() {
      const that =this;
    const data = {
      data: {
        type: 'vehicles',
        attributes: {
          license: this.state.inputLicense,
          origin: this.state.inputOrigin,
          destination: this.state.inputDestination,
          duration: 10000000,
          startTime: new Date().getTime()
        }
      }
    };
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/vehicles', true);
    xhr.setRequestHeader('Content-Type', 'application/vnd.api+json');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = processRequest;
    function processRequest() {
      if (xhr.readyState === 4 && xhr.status === 201) {
        const response = JSON.parse(String(xhr.response));
        console.log("Id :" + response.data.id);
        const vehicleData = {
            data: [{
                type: 'vehicles',
                id : response.data.id
            }]
        }
        const addRelationship = new XMLHttpRequest();
          addRelationship.open('POST', `http://localhost:3000/api/users/${that.props.user.userId}/relationships/vehicles`, true);
          addRelationship.setRequestHeader('Content-Type', 'application/vnd.api+json');
          addRelationship.send(JSON.stringify(vehicleData));

          addRelationship.onreadystatechange = process;
          function process() {
              console.log("Status" + addRelationship.status);
          }
      }
    }
  }

  // callback function called when a child car info component is deleted
  refresh() {
    this.setState({numberOfVehicles: this.state.numberOfVehicles - 1});
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps
)(Home);
