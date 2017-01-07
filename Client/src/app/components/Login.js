import React from "react";
import { browserHistory } from "react-router";

export class Login extends React.Component {
  onLogin() {
    browserHistory.push("/home");
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="medium-6 medium-centered large-4 large-centered columns">

            <form>
              <div className="row column log-in-form">
                <h4 className="text-center">Log in with you email account</h4>
                <label>Email
                  <input type="text" placeholder="somebody@example.com"/>
                </label>
                <label>Password
                  <input type="text" placeholder="Password"/>
                </label>
                <input id="show-password" type="checkbox"/><label for="show-password">Show password</label>
                  <p><button className="button expanded" onClick={this.onLogin}>Log In</button></p>
                  <p className="text-center"><a href="#">Forgot your password?</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}