import * as firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth"

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBRvuJPwm4msTzUrX0vE-4XxQnng73eGIY",
    authDomain: "playground-d763c.firebaseapp.com",
    databaseURL: "https://playground-d763c.firebaseio.com",
    projectId: "playground-d763c",
    storageBucket: "playground-d763c.appspot.com",
    messagingSenderId: "549966896469",
    appId: "1:549966896469:web:5aa33d1488e54587c523dc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase