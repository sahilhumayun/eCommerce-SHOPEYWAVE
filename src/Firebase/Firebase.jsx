// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRbiouhXvjvnIYMqhwFLDE8r-S-c3t4BA",
  authDomain: "shopeywave-4a03e.firebaseapp.com",
  projectId: "shopeywave-4a03e",
  storageBucket: "shopeywave-4a03e.appspot.com",
  messagingSenderId: "694255956033",
  appId: "1:694255956033:web:727122d6f8651ac4b9d6c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firedb = getFirestore(app)
const auth = getAuth(app)

export { firedb , auth }