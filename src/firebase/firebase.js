import * as firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth"

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCqnFX9TxTMhpGzE1VzALMNJX0nj1zaYqI",
    authDomain: "cryptolio-c5b48.firebaseapp.com",
    projectId: "cryptolio-c5b48",
    storageBucket: "cryptolio-c5b48.appspot.com",
    messagingSenderId: "955536732408",
    appId: "1:955536732408:web:b7573e5e1d245b3f000b0d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase