import React, { Component } from "react";
import firebase from "../../Config/Firebase";
import * as firebaseui from "firebaseui";

class SignIn extends Component {
  componentDidMount() {
    // const fbase = firebase.initializeApp(firebase);
    const uiConfig = {
      signInSuccessUrl: "/", //This URL is used to return to that page when we got success response for phone authentication.
      signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      tosUrl: "/",
      callbacks: {
        signInSuccessWithAuthResult: async function (authResult, redirectUrl) {
          var user = "registered";
          // var credential = authResult.credential;
          // var isNewUser = authResult.additionalUserInfo.isNewUser;
          // var providerId = authResult.additionalUserInfo.providerId;
          // var operationType = authResult.operationType;
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          await localStorage.setItem("usersData", user);
          console.log(localStorage.getItem("usersData"));
          return true;
        },
      },
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
  render() {
    return <div id="firebaseui-auth-container"></div>;
  }
}

export default SignIn;
