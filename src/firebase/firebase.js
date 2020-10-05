import * as firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth"

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCWCapA1T7_7zyOoU4rtO2nFKgnl0_T_44",
    authDomain: "registration-form-enthrall.firebaseapp.com",
    databaseURL: "https://registration-form-enthrall.firebaseio.com",
    projectId: "registration-form-enthrall",
    storageBucket: "registration-form-enthrall.appspot.com",
    messagingSenderId: "683226247981",
    appId: "1:683226247981:web:ebf7b774d4768d688e19a4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase