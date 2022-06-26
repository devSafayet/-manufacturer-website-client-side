// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk7LVAephjNt_thTFiGyr7zhRBK6D7vHk",
  authDomain: "moto-world-a9ab6.firebaseapp.com",
  projectId: "moto-world-a9ab6",
  storageBucket: "moto-world-a9ab6.appspot.com",
  messagingSenderId: "701968974372",
  appId: "1:701968974372:web:ecea562b3d1f870e7a8eb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;