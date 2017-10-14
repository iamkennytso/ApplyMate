import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInUsername: '',
      signInPassword: '',
      
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleGitAuth = this.handleGitAuth.bind(this);
    this.handleTest = this.handleTest.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.signIn(this.state.signInUsername, this.state.signInPassword);
  }
  handleTest(e) {
    e.preventDefault();
    this.props.TESTBUTTON();
  }
  handleGitAuth(e) {
    e.preventDefault();
    this.props.GitAuth()
  }
  handleSignOut(e) {
    e.preventDefault();
    this.props.signOut();
  }
  handleUsername(e) {
    this.setState({
      signInUsername: e.target.value,
    });
  }
  handlePassword(e) {
    this.setState({
      signInPassword: e.target.value,
    });
  }
  render() {
    return (
      <div>Hello World
        <form id="signIn" onSubmit={e => this.handleLogin(e)}>
          <input onChange={this.handleUsername} value={this.state.signInUsername} type="text" placeholder="E-Mail Address" /> <br />
          <input onChange={this.handlePassword} value={this.state.signInPassword} type="password" placeholder="Password" /> <br />
          <button type="submit">Sign In</button>
        </form>
        <Link to="/signup">
          <button>Sign Up
          </button>
        </Link>
        <br /><br />
        <button id="GitAuthButton" onClick={this.handleGitAuth}>Login using Github</button>
        <br />
        <button onClick={this.handleSignOut}>LogOut</button>
        <br /><br /><br /><br />
        <button onClick={this.handleTest}>TESTBUTTON</button>
      </div>
    );
  }
}

export default Login;
