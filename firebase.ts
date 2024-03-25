// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional 

const firebaseConfig = {
  apiKey: import.meta.env.APP_FIREBASE_apiKey,
  authDomain: import.meta.env.APP_FIREBASE_authDomain,
  projectId: import.meta.env.APP_FIREBASE_projectId,
  storageBucket: import.meta.env.APP_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.APP_FIREBASE_messagingSenderId,
  appId: import.meta.env.APP_FIREBASE_appId,
  measurementId: import.meta.env.APP_FIREBASE_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);
auth.useDeviceLanguage();

const ggProvider = new GoogleAuthProvider();

const gitProvider = new GithubAuthProvider();

export { auth, db, ggProvider, gitProvider };