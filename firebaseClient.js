const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDVWchNMrGkeFMstlUhxHN4ga7FP3XT_MY",
  authDomain: "abseil-pro-app.firebaseapp.com",
  projectId: "abseil-pro-app",
  storageBucket: "abseil-pro-app.appspot.com",
  messagingSenderId: "578900595923",
  appId: "1:578900595923:web:152bd23665097bc07d3026"
};

export default function firebaseClient() {
    if(!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}