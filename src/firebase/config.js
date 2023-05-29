import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBio8UMcN2kaA30rl99LQS2k1Fj5hXYjQY",
  authDomain: "finance-tracker-4db80.firebaseapp.com",
  projectId: "finance-tracker-4db80",
  storageBucket: "finance-tracker-4db80.appspot.com",
  messagingSenderId: "609161173804",
  appId: "1:609161173804:web:49966df53ef854297b2a89",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();
const timeStamp = firebase.firestore.Timestamp;
const projectAuth = firebase.auth();
export { projectFirestore, projectAuth, timeStamp };
