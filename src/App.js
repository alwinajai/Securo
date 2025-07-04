// src/App.js
import './App.css';
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import MainApp from "./MainApp";
import { motion } from "framer-motion";

function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  return (
    <div>
      {/* Branding Header */}
      <motion.div
        className="app-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="brand-name">🔐 SECURO</h1>
      </motion.div>

      {/* Conditional View */}
      {!userEmail ? (
        showLogin ? (
          <>
            <Login onLogin={(email) => {
              setUserEmail(email);
              localStorage.setItem("userEmail", email);
            }} />
            <p className="toggle-text">
              Don’t have an account?{" "}
              <button className="toggle-button" onClick={() => setShowLogin(false)}>Register</button>
            </p>
          </>
        ) : (
          <>
            <Register />
            <p className="toggle-text">
              Already have an account?{" "}
              <button className="toggle-button" onClick={() => setShowLogin(true)}>Login</button>
            </p>
          </>
        )
      ) : (
        <MainApp loggedInEmail={userEmail} />
      )}
    </div>
  );
}

export default App;
