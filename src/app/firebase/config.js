import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage} from "firebase/storage";

// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTkEglLidCL9EvF4WzoKa0Z_1E3lq1yUQ",
  authDomain: "pantry-tracker-e8d7f.firebaseapp.com",
  projectId: "pantry-tracker-e8d7f",
  storageBucket: "pantry-tracker-e8d7f.appspot.com",
  messagingSenderId: "896123840592",
  appId: "1:896123840592:web:000ae75e25ae3cf00d4955",
  measurementId: "G-HMTETNEH8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};
