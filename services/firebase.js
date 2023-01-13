import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5p9cMTL8uCNi7ak5ASXsUFArU63t_wno",
  authDomain: "minhadiscografia-f3464.firebaseapp.com",
  projectId: "minhadiscografia-f3464",
  storageBucket: "minhadiscografia-f3464.appspot.com",
  messagingSenderId: "812409695966",
  appId: "1:812409695966:web:4b70a4b6635b9f658f1c4f",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export const auth = getAuth(app);
export { db };
