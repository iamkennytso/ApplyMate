import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.signIn(this.signInUsername.value, this.signInPassword.value);
  }

  render() {
    console.log(this.props);
    return (
      <div id="temp">Hello World {this.props.signIn}
        <form id="signIn" onSubmit={e => this.handleLogin(e)}>
          <input ref={(input) => { this.signInUsername = input; }} type="text" placeholder="E-Mail Address" /> <br />
          <input ref={(input) => { this.signInPassword = input; }} type="password" placeholder="Password" /> <br />
          <button type="submit">Sign In</button>
        </form>
        <Link to="/signup">
          <button>Sign Up
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
