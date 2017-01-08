import React from "react";

export class CarInfo extends React.Component {
  render() {
    return (
      <div className="column">
        <div className="callout">
          <p>Car {this.props.number}</p>
          <p><img src="http://placehold.it/400x370&text=Pegasi B" alt="image of a planet called Pegasi B"/></p>
          <p className="lead">Copernican Revolution caused an uproar</p>
          <div className="progress" role="progressbar" tabIndex="0" aria-valuenow="50" aria-valuemin="0" aria-valuetext="50 percent" aria-valuemax="100">
            <div className="progress-meter" style={{width: '50%'}}></div>
          </div>
        </div>
      </div>
    );
  }
}