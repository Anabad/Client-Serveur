import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

class User extends React.Component {

  onNavigateHome() {
    browserHistory.push('/home');
  }

  componentWillMount() {
    console.log(this.props.isLoggedIn);
    if (!this.props.isLoggedIn) {
      browserHistory.push('/login');
    }
  }

  render() {
    return (
            <div>
                <p className="header">The User Page</p>
                <p className="subheader">User name: {this.props.user.username}</p>
                <button className="button" onClick={this.onNavigateHome}>Go Home!</button>
            </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isLoggedIn: state.isLoggedIn
});

export default connect(
mapStateToProps
)(User);
