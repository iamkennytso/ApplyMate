import React from 'react';
import fire from './Firebase.js';
import firebase from 'firebase';
import axios from 'axios';

let email;
let pendingCred;

exports.signUp = (user, pass, first, last, cb) => {
  fire.auth().createUserWithEmailAndPassword(user, pass)
    .then((newUser) => {
      cb(undefined, newUser);
      axios.post('/api/signUp', {
        data: {
          id: newUser.uid,
          firstName: first,
          lastName: last,
          email: newUser.email,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((error) => {
      cb(error.message);
    });
};
exports.signIn = (user, pass, cb) => {
  fire.auth().signInWithEmailAndPassword(user, pass)
    .then((win) => {
      cb(undefined, win);
    })
    .catch((error) => {
      cb(error.message);
    });
};
exports.signOut = (cb) => {
  fire.auth().signOut()
    .then(() => {
      cb(undefined, null);
    })
    .catch((error) => {
      cb(error);
    });
};
exports.gitAuth = (cb) => {
  const provider = new firebase.auth.GithubAuthProvider();
  fire.auth().signInWithPopup(provider)
    .then((user) => {
      axios.post('/api/scanForUser', {
        data: { email: user.user.email },
      })
        .then((result) => {
          console.log('result.data[0]', result.data[0])
          console.log(result.data[0] === undefined)
          if (result.data[0] === undefined) {
            console.log('calling signup from github')
            axios.post('/api/signUp', {
              data: {
                id: user.user.uid,
                email: user.user.email,
              },
            })
              .catch(err => alert(err))
          }
        })
        .catch(err => alert(err));
    })
    .catch((error) => {
      pendingCred = error.credential;
      email = { error: email };
      cb(error);
    });
};
exports.gitAuthMerge = (pass, cb) => {
  fire.auth().fetchProvidersForEmail(email)
    .then((providers) => {
      if (providers[0] === 'password') {
        const password = pass;
        fire.auth().signInWithEmailAndPassword(email, password)
          .then(user => user.linkWithCredential(pendingCred))
          .catch(err => alert(err))
          .then(() => {
            cb();
          })
          .catch(err => alert(err));
      }
    });
};
