// src/Login.js
import './App.css';
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      //  Save email to localStorage
      localStorage.setItem("userEmail", email);

      //  Inform parent component that login succeeded
      onLogin(email);
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="App">
      <h2>🔐 Login</h2>
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default Login;
