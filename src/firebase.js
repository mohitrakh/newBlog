// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPyd4DcaW_0q83wGEorzO7URK12Wyl8OA",
  authDomain: "blog-d2d0b.firebaseapp.com",
  projectId: "blog-d2d0b",
  storageBucket: "blog-d2d0b.appspot.com",
  messagingSenderId: "358914729473",
  appId: "1:358914729473:web:3bccae5b1d7acf58e20200",
  measurementId: "G-P2XDDBSMHN",
};

// Initialize Firebase
// https://blog-deploy-afnh.onrender.com/
export const app = initializeApp(firebaseConfig);
