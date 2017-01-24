import React from "react";
import { connect } from 'react-redux';
import Request from 'react-http-request';

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loginClicked: false,
      username: "",
      password: "",
      userId: ""
    };
    this.onLogin = this.onLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onLogin() {
    this.setState({loginClicked: true});
    console.log(this.state.username);
  }

  //Handle the changes of input fields
  handleChange(event) {
    this.state[event.target.id] = event.target.value;
  }
  
  render() {
    return (
      <div>
        { this.state.loginClicked ?
          <Request
          url='http://localhost:3000/api/auth'
          method='post'
          accept='application/json'
          verbose={true}
          send={{"username":this.state.username,"password":this.state.password}}
          >
          {
            ({error, result, loading}) => {
              if (loading) {
                return <div>loading...</div>;
              } else {
                this.state.loginClicked = false;
                if (result.text != "false"){
                  this.props.onUserLoggedIn({username:this.state.username,userId:result.text});
                  return null;
                }
                return null;
              }
            }
          }
          </Request> :
            <p>Hello</p>
          }
        <div className="row">
          <div className="medium-6 medium-centered large-4 large-centered columns">

            {/*<form>*/}
              <div className="row column log-in-form">
                <h4 className="text-center">Log in with you email account</h4>
                <label>Email
                  <input id="username" type="text" placeholder="somebody@example.com" onChange={this.handleChange}/>
                </label>
                <label>Password
                  <input id="password" type="text" placeholder="Password" onChange={this.handleChange}/>
                </label>
                <input id="show-password" type="checkbox"/><label htmlFor="show-password">Show password</label>
                  <p><button className="button expanded" onClick={this.onLogin}>Log In</button></p>
                  <p className="text-center"><a href="#">Forgot your password?</a></p>
              </div>
            {/*</form>*/}
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
  onUserLoggedIn : (user) => {
    dispatch({
      type: "LOGIN",
      user
    })
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)