// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLva_5cPQvPZcxZWJl6zv_CdfqEEpK_zA",
  authDomain: "todo-6eb1d.firebaseapp.com",
  projectId: "todo-6eb1d",
  storageBucket: "todo-6eb1d.appspot.com",
  messagingSenderId: "585621330575",
  appId: "1:585621330575:web:6cccc76fc4ba4dfee42efa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;