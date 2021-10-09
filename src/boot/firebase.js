import { boot } from 'quasar/wrappers'

import { initializeApp } from 'firebase/app';


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
  apiKey: "AIzaSyAmU6W6Rh3fI9kNFlXcEdFuW2pvCdYeSTU",
  authDomain: "switter-20a38.firebaseapp.com",
  projectId: "switter-20a38",
  storageBucket: "switter-20a38.appspot.com",
  messagingSenderId: "197793483592",
  appId: "1:197793483592:web:f7e89beda9d2dbcaf3817d"

};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore()
export default db
