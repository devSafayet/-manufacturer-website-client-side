// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQWSZKM0HSDrkejpfHpEA68uKqgZasKQg",
  authDomain: "moto-world-4e151.firebaseapp.com",
  projectId: "moto-world-4e151",
  storageBucket: "moto-world-4e151.appspot.com",
  messagingSenderId: "110053682597",
  appId: "1:110053682597:web:6bc034baf685501ba60c4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;