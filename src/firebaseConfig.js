// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "apikey ",
  authDomain: "fileapp-5ee5d.firebaseapp.com",
  projectId: "fileapp-5ee5d",
  storageBucket: "fileapp-5ee5d.firebasestorage.app",
  messagingSenderId: "862682234366",
  appId: "1:862682234366:web:00c1306cdf969d214c94af"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
