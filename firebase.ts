// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuDr_sXy9n7uPP6U9YTwM_uDwbqK5Np48",
  authDomain: "feeds-48aa3.firebaseapp.com",
  projectId: "feeds-48aa3",
  storageBucket: "feeds-48aa3.appspot.com",
  messagingSenderId: "758311602241",
  appId: "1:758311602241:web:fe9b8ba9601ee30a42dec0",
  measurementId: "G-26DC9NB0SG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);