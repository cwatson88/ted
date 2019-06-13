import React from "react";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import SignIn from "./SignIn";
import SignOut from "./SignOut";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SignIn />
        <SignOut />
      </header>
    </div>
  );
}

export default App;
