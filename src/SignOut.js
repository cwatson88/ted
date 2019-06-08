import React from "react";
import * as firebase from "firebase";

const SignOut = () => {
  const fbSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        console.log("signed out!");
      })
      .catch(function(error) {
        console.error(error);
        // An error happened.
      });
  };

  return (
    <div>
      <button type="button" onClick={fbSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
