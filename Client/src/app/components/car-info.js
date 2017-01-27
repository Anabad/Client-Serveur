import React from 'react';

export default class CarInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progression: 0,
      finished: false,
      inputDestination: '',
      iconValue: Math.floor(Math.random() * 10)
    };

    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.displayProgressBar = this.displayProgressBar.bind(this);
    this.displayPositionInfo = this.displayPositionInfo.bind(this);
    this.displayNewTripButton = this.displayNewTripButton.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
    this.updateTrip = this.updateTrip.bind(this);

    // Call the function update every 1 sec
    setInterval(this.update, 1000);
  }

  // Handle the changes of input fields
  handleChange(event) {
    this.state[event.target.id] = event.target.value;
  }

  // Return the progression of the trip in %
  getProgression() {
    const duration = this.props.duration;
    const timeSpent = new Date().getTime() - this.props.startTime;
    let progress;
    // If the car is traveling
    if (duration > timeSpent) {
      progress = timeSpent / duration * 100;
      this.state.finished = false;
    } else {
      progress = 100;
      this.state.finished = true;
    }

    this.setState({
      progression: progress
    });
  }

  // Get the progress bar type to color the bar in green when finished or blue when on going
  displayProgressBar() {
    if (this.props.duration < (new Date().getTime() - this.props.startTime)) {
      return (
        <div className="success progress" role="progressbar" tabIndex="0" aria-valuenow="50" aria-valuemin="0" aria-valuetext="50 percent" aria-valuemax="100">
          <div className="progress-meter" style={{width: this.state.progression.toString() + '%'}}></div>
        </div>
      );
    }
    return (
            <div className="progress" role="progressbar" tabIndex="0" aria-valuenow="50" aria-valuemin="0" aria-valuetext="50 percent" aria-valuemax="100">
              <div className="progress-meter" style={{width: this.state.progression.toString() + '%'}}></div>
            </div>
    );
  }

  // Return the correct elements to display, depending of whether or not the trip is finished
  displayPositionInfo() {
    // If it's not finished, display the origin, destination and progression
    if (!this.state.finished) {
      return <span>
                  <p className="lead"><b>Origin :</b> {this.props.origin}</p>
                  <p className="lead"><b>Destination :</b> {this.props.destination}</p>
                  <p className="lead"><b>Progression :</b> {Math.round(this.state.progression).toString()}%</p>
                </span>;
    }
    // If it's finished, only display the current position

    return <p className="lead"><b>Location : </b>{this.props.destination}</p>;
  }

  // Return the button to set a new trip if finished only
  displayNewTripButton() {
    // If finished, display the button to set a new trip
    if (this.state.finished) {
      return <p>
                <p>New destination : </p>
                <input id="inputDestination" type="text" placeholder="Destination" style={{width: '80%', float: 'left'}} onChange={this.handleChange}/>
                <button className="button" onClick={this.updateTrip}>Go</button>
             </p>;
    }
    // else, display nothing

    return null;
  }

  deleteCar() {
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:3000/api/vehicles/' + this.props.id.toString(), true);
    xhr.setRequestHeader('Content-Type', 'application/vnd.api+json');
    xhr.send();
    // eslint-disable-next-line no-unused-expressions
    this.props.callback();
  }

  updateTrip() {
    // Create the data JSON to send
    const data = {data: {
      id: this.props.id.toString(),
      type: 'vehicles',
      attributes:
      {
        origin: this.props.destination,
        destination: this.state.inputDestination,
        duration: 100000,
        startTime: new Date().getTime()
      }
    }};

    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', 'http://localhost:3000/api/vehicles/' + this.props.id.toString(), true);
    xhr.setRequestHeader('Content-Type', 'application/vnd.api+json');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = processRequest;

    function processRequest() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);

        // Set the origin as the current location (aka destination)
        this.props.origin = this.props.destination;
        // Set the destination
        this.props.destination = this.state.inputDestination;
      }
    }
  }

  render() {
    return (
      <div className="column">
        <div className="callout">
          <p className="lead"><b>Car {this.props.number}</b></p>
          <div className="row">
            <p className="small-6 columns">
              <img src={"/assets/img/CarIcon"+this.state.iconValue.toString()+".png"} alt="Car icon"/>
            </p>
            <div className="small-6 columns">
              <p className="lead"><b>License :</b> {this.props.license}</p>
              {this.displayPositionInfo()}
              <hr/>
              {this.displayNewTripButton()}
              <p><button className="alert button" onClick={this.deleteCar}>Delete car</button></p>
            </div>
          </div>
          {this.displayProgressBar()}
        </div>
      </div>
    );
  }

  // refresh the component by refreshing the state of the progression variable
  update() {
    this.getProgression();
  }
}
