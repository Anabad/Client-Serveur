import React from 'react';
import {connect} from 'react-redux';
// eslint-disable-next-line no-unused-vars
import Request from 'react-http-request';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginClicked: false,
      username: '',
      password: '',
      userId: ''
    };
    this.onLogin = this.onLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onLogin() {
    this.setState({loginClicked: true});
  }

  // Handle the changes of input fields
  handleChange(event) {
    this.state[event.target.id] = event.target.value;
  }

  // Checks if there are users if not adds them
  componentWillMount() {
      // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/users', true);
    xhr.setRequestHeader('Content-Type', 'application/vnd.api+json');
    xhr.send();
    xhr.onreadystatechange = processRequest;

    function processRequest() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.data.length < 1) {
          const maxime = {
            data: {
              type: 'users',
              attributes: {
                name: 'Maxime',
                password: 'ember'
              }
            }
          };
          const pierreAymeric = {
            data: {
              type: 'users',
              attributes: {
                name: 'Pierre-Aymeric',
                password: 'react'
              }
            }
          };

            // eslint-disable-next-line no-undef
          const xhr = new XMLHttpRequest();
            // eslint-disable-next-line no-undef
          const xhr2 = new XMLHttpRequest();
          xhr.open('POST', 'http://localhost:3000/api/users', true);
          xhr.setRequestHeader('Content-Type', 'application/vnd.api+json');
          xhr.send(JSON.stringify(maxime));
          xhr2.open('POST', 'http://localhost:3000/api/users', true);
          xhr2.setRequestHeader('Content-Type', 'application/vnd.api+json');
          xhr2.send(JSON.stringify(pierreAymeric));
        }
      }
    }
  }

  render() {
    return (
      <div>
        { this.state.loginClicked ?
          <Request
          url="http://localhost:3000/api/auth"
          method="post"
          accept="application/json"
          verbose={true}
          send={{username: this.state.username, password: this.state.password}}
          >
          {
            ({result, loading}) => {
              if (loading) {
                return <div>loading...</div>;
              }
              this.state.loginClicked = false;
              if (result.text !== 'false') {
                this.props.onUserLoggedIn({username: this.state.username, userId: result.text});
                return null;
              }
              return null;
            }
          }
          </Request> :
            <div></div>
          }
        <div className="row">
          <div className="medium-6 medium-centered large-4 large-centered columns">

            {/* <form> */}
              <div className="row column log-in-form">
                <h4 className="text-center">Log in with you email account</h4>
                <label>Email
                  <input id="username" type="text" placeholder="somebody@example.com" onChange={this.handleChange}/>
                </label>
                <label>Password
                  <input id="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                </label>
                  <p><button className="button expanded" onClick={this.onLogin}>Log In</button></p>
              </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  userId: state.user.userId
});

const mapDispatchToProps = dispatch => ({
  onUserLoggedIn: user => {
    dispatch({
      type: 'LOGIN',
      user
    });
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
