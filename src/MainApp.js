// src/MainApp.js
import './App.css';
import React, { useState, useEffect } from "react";
import {
  generateAESKey,
  encryptFile,
  importAESKey,
  decryptFile,
  base64ToBytes
} from "./cryptoHelpers";
import { sendKeysByEmail } from "./emailHelper";

function MainApp({ loggedInEmail }) {
  const [file, setFile] = useState(null);
  const [encFile, setEncFile] = useState(null);
  const [aesKeyInput, setAesKeyInput] = useState("");
  const [ivInput, setIvInput] = useState("");

  const [countdown, setCountdown] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const handleEncrypt = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      const key = await generateAESKey();
      const { encryptedData, iv } = await encryptFile(file, key);
      const blob = new Blob([encryptedData], { type: "application/octet-stream" });

      const exportedKey = await window.crypto.subtle.exportKey("raw", key);
      const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
      const ivBase64 = btoa(String.fromCharCode(...iv));

      // Send the keys to the email
      await sendKeysByEmail(loggedInEmail, keyBase64, ivBase64)
        .then(() => {
          console.log("Email sent successfully!");
        })
        .catch((err) => {
          const errorMessage = err?.text || err?.message || JSON.stringify(err);
          console.error("Failed to send email:", errorMessage);
          alert("Failed to send email: " + errorMessage);
        });

      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.name}.encrypted`;
      a.click();

      setCountdown(30);
      setTimerActive(true);
      alert("Encrypted! AES & IV sent via email. File will auto-delete in 30 sec.");
    } catch (error) {
      alert("Encryption failed: " + error.message);
    }
  };

  const handleDecrypt = async () => {
    if (!encFile || !aesKeyInput || !ivInput) {
      alert("Please provide all fields!");
      return;
    }

    try {
      const key = await importAESKey(aesKeyInput);
      const iv = base64ToBytes(ivInput);
      const fileData = await encFile.arrayBuffer();
      const decryptedBlob = await decryptFile(fileData, key, iv);

      const url = URL.createObjectURL(decryptedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "decrypted_" + encFile.name.replace(".encrypted", "");
      a.click();
      alert("Decryption successful!");
    } catch (err) {
      alert("Decryption failed: " + err.message);
    }
  };

  useEffect(() => {
    let timer;
    if (timerActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (timerActive && countdown === 0) {
      setFile(null);
      setTimerActive(false);
      alert("Encrypted file auto-deleted from memory!");
    }
    return () => clearTimeout(timer);
  }, [countdown, timerActive]);

  return (
    <div className="App">
      <h2>🔐 Secure File Transfer</h2>

      <h3>Encrypt</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleEncrypt}>Encrypt & Download</button>
      {timerActive && <p>Auto-delete in {countdown}s</p>}

      <h3>Decrypt</h3>
      <input type="file" onChange={(e) => setEncFile(e.target.files[0])} />
      <input
        placeholder="AES Key (Base64)"
        value={aesKeyInput}
        onChange={(e) => setAesKeyInput(e.target.value)}
      />
      <input
        placeholder="IV (Base64)"
        value={ivInput}
        onChange={(e) => setIvInput(e.target.value)}
      />
      <button onClick={handleDecrypt}>Decrypt & Download</button>
      <button onClick={() => {
  localStorage.removeItem("userEmail");
  window.location.reload();
}}>Logout</button>
    </div>
    
  );
}

export default MainApp;
