// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzG3CWMPLUwRM-ez8vs3QYHPDA3YLTRlY",
  authDomain: "miniblog-6d46d.firebaseapp.com",
  projectId: "miniblog-6d46d",
  storageBucket: "miniblog-6d46d.appspot.com",
  messagingSenderId: "232733359164",
  appId: "1:232733359164:web:9f1075e23cf5dc04b3d739",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
