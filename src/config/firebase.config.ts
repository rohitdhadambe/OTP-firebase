import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv71GJAYnYgTGt1KQseKJ1E9kAs6kDkiw",
  authDomain: "otp-project-3f4db.firebaseapp.com",
  databaseURL: "https://otp-project-3f4db-default-rtdb.firebaseio.com",
  projectId: "otp-project-3f4db",
  storageBucket: "otp-project-3f4db.firebasestorage.app",
  messagingSenderId: "687354542444",
  appId: "1:687354542444:web:10c44c9a9daa364bca1b49",
  measurementId: "G-LERZVHT6GE"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
auth.useDeviceLanguage();
