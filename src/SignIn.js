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

  const getUser = async () => {
    try {
      // if the app is not initailised, initalise it
      (await !firebase.apps.length)
        ? await firebase.initializeApp(firebaseConfig)
        : await firebase.app();

      // check if the auth state changes
      firebase.auth().onAuthStateChanged(({ displayName, email }) => {
        console.log(displayName, email);
        setUser(displayName);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  });

  const fbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;

        // signed in user details
        const { name, email } = result.additionalUserInfo.profile;
        setUser(name);
        console.log(name, email);
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  return (
    <div>
      <button type="button" onClick={fbSignIn}>
        Sign In
      </button>
      user:
      <br />
      {user}
    </div>
  );
};

export default SignIn;
