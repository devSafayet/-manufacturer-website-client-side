// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqoK64GP5L7xMi7--wzSil3MXKL1wTFOE",
    authDomain: "motor-bike-parts-28b11.firebaseapp.com",
    projectId: "motor-bike-parts-28b11",
    storageBucket: "motor-bike-parts-28b11.appspot.com",
    messagingSenderId: "1029519946926",
    appId: "1:1029519946926:web:34d6b3f2cf3895c6a4e93f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;