  // Your web app's Firebase configuration
  import * as firebase from "firebase";
  import 'firebase/database';
  const config = {
    apiKey: "AIzaSyD1Xfu4B19ViCyaiZ8ZHQ1edPgkpI8H1jQ",
    authDomain: "react-notes-fd7f9.firebaseapp.com",
    databaseURL: "https://react-notes-fd7f9.firebaseio.com",
    projectId: "react-notes-fd7f9",
    storageBucket: "react-notes-fd7f9.appspot.com",
    messagingSenderId: "151426422915",
    appId: "1:151426422915:web:f4b639a6c5ca6f33d8a3b6",
    measurementId: "G-RGL52CXDTH"
  };
  export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();