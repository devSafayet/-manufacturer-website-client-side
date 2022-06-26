// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuF-SUM5XCwmUz3ssGP2kb04tX9wmqEAw",
  authDomain: "moto-world-42bb4.firebaseapp.com",
  projectId: "moto-world-42bb4",
  storageBucket: "moto-world-42bb4.appspot.com",
  messagingSenderId: "395581320029",
  appId: "1:395581320029:web:5abd12924d55d37aaad6b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;