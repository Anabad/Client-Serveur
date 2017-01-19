import React from "react";

export class CarInfo extends React.Component {

  //Return the avancement of the trip in %
  GetProgression(){
    var duration = this.props.duration;
    var timeSpent = new Date().getTime()-this.props.startTime;
    var progress = 100;
    if(duration>timeSpent) {
      progress = timeSpent / duration *100;
    }
    return progress.toString()+'%';
  }

  //Get the progress bar type to color the bar in green when finished or blue when on going
  GetProgressBar(){
    if(this.props.duration<(new Date().getTime()-this.props.startTime)){
      return (
        <div className="success progress" role="progressbar" tabIndex="0" aria-valuenow="50" aria-valuemin="0" aria-valuetext="50 percent" aria-valuemax="100">
          <div className="progress-meter" style={{width: this.GetProgression()}}></div>
        </div>
          );
    }else{
          return (
            <div className="progress" role="progressbar" tabIndex="0" aria-valuenow="50" aria-valuemin="0" aria-valuetext="50 percent" aria-valuemax="100">
              <div className="progress-meter" style={{width: this.GetProgression()}}></div>
            </div>
          );
        }
  }

  render() {
    return (
      <div className="column">
        <div className="callout">
          <p>Car {this.props.number}</p>
          <p><img src="http://placehold.it/400x370&text=Pegasi B" alt="image of a planet called Pegasi B"/></p>
          <p className="lead">License : {this.props.license}</p>
          <p className="lead">Origin : {this.props.origin}</p>
          <p className="lead">Destination : {this.props.destination}</p>
          <p className="lead">Progression : {this.GetProgression()}</p>
          {this.GetProgressBar()}
        </div>
      </div>
    );
  }
}