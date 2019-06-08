import React, { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

let provider = new firebase.auth.GoogleAuthProvider();
const scopes = [
  "https://www.googleapis.com/auth/contacts.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile"
];
scopes.map(scope => provider.addScope(scope));

const SignIn = () => {
  const [user, setUser] = useState(["empty"]);

  useEffect(() => {
    try {
      !firebase.apps.length
        ? firebase.initializeApp(firebaseConfig)
        : firebase.app();
      console.log(firebase.app());
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(idToken => {
          // idToken can be passed back to server.
          console.log(idToken);
        })
        .catch(error => {
          console.error(error);
          // Error occurred.
        });
      const user = firebase.auth().onAuthStateChanged(console.log);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  });

  const fbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        //   const user = result.user;

        const { name, email } = result.additionalUserInfo.profile;
        setUser(name);
        console.log(name, email);
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  };

  return (
    <div>
      <button type="button" onClick={fbSignIn}>
        Sign In
      </button>
      user
      {user}
    </div>
  );
};

export default SignIn;
