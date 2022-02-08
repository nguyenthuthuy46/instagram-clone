import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnfphcN_Ezb5B5iW9JnoDy8OuHi1ycj5U",
  authDomain: "instagram-clone-1-dca2e.firebaseapp.com",
  projectId: "instagram-clone-1-dca2e",
  storageBucket: "instagram-clone-1-dca2e.appspot.com",
  messagingSenderId: "797358639453",
  appId: "1:797358639453:web:bdc0000f9754a8006fc0b4"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export {app, db, storage}
