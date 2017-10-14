import React from 'react';
import firebase from 'firebase';
import { browserHistory, Route, Redirect, Switch } from 'react-router-dom';
import { Alert, Modal } from 'react-bootstrap';
import fire from './Firebase.js';
import Signup from './signup.js';
import Login from './login.js';
import Home from './home.js';
import Auth from './Auth.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoggedIn: false,
      gitMerging: true,
    };
    this.setUser = this.setUser.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.GitAuth = this.GitAuth.bind(this);
    this.GitMerge = this.GitMerge.bind(this);
    this.closeMerge = this.closeMerge.bind(this);
    this.TESTBUTTON = this.TESTBUTTON.bind(this);
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user,
          isLoggedIn: false,
        });
      }
    });
  }
  setUser(user, bool) {
    this.setState({
      user,
      isLoggedIn: bool,
    });
  }
  signUp(user, pass, first, last) {
    Auth.signUp(user, pass, first, last, (err, win) => {
      if (err) alert(err);
      else {
        this.setUser(win, true);
      }
    });
  }
  signIn(user, pass) {
    Auth.signIn(user, pass, (err, win) => {
      if (err) alert(err);
      else {
        this.setUser(win, true);
      }
    });
  }
  signOut() {
    Auth.signOut((err, win) => {
      if (err) alert(err);
      else {
        this.setUser(win, false);
      }
    });
  }
  closeMerge() {
    this.setState({
      gitMerging: false,
    });
  }
  GitAuth() {
    Auth.gitAuth((error, win) => {
      if (error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          this.setState({
            gitMerging: true,
            user: error.email,
          });
        } else {
          alert(error);
        }
      } else {
        this.setUser(win, true);
      }
    }, (whatever) => { console.log(whatever.user.email); });
  }
  GitMerge(e) {
    e.preventDefault();
    Auth.gitAuthMerge(this.mergePass.value, () => { this.closeMerge(); });
  }
  TESTBUTTON(e) {
    console.log('firebase.auth().currentUser', firebase.auth().currentUser);
    console.log('this.state.user', this.state.user);
    console.log('this.state.isLoggedIn', this.state.isLoggedIn);
  }
  requireAuth() {
    return !this.state.isLoggedIn;
  }
  routes(reRoutePath, isAuthReq, isAuthNotReq) {
    return (
      <Route
        path={reRoutePath}
        render={() => (
        this.requireAuth() ? (
        isAuthReq
      ) : (
        isAuthNotReq
      )
      )}
      />
    );
  }

  render() {
    return (
      <div>

        <Switch>
          {this.routes('/signup', <Signup signUp={this.signUp} TESTBUTTON={this.TESTBUTTON} />, <Redirect to="/home" />)}
          {this.routes('/login', <Login signIn={this.signIn} GitAuth={this.GitAuth} TESTBUTTON={this.TESTBUTTON} signOut={this.signout} />, <Redirect to="/home" />)}
          {this.routes('/home', <Redirect to="/login" />, <Home signOut={this.signOut} user={this.state.user} TESTBUTTON={this.TESTBUTTON} />)}
          <Route
            exact
            path="*"
            render={() => (
              <Redirect to="/login" />
          )}
          />
        </Switch>
      </div>);
  }
}

export default App;
