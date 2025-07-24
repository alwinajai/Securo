# 🔐SECURO: Secure File Transfer App

SECURO is a web-based secure file transfer platform built with **React** that enables users to upload, encrypt, and share files securely. It leverages **AES-256 encryption** for confidentiality and delivers encryption keys via **EmailJS** to the user’s registered email. Firebase handles authentication for safe and seamless user management.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [AES-256 Encryption Explained](#aes-256-encryption-explained)
- [Live Demo (Optional)](#live-demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Firebase Configuration](#firebase-configuration)
  - [EmailJS Integration](#emailjs-integration)
- [Usage Guide](#usage-guide)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

##Features

- 🔐 AES-256 client-side file encryption
- 📤 Secure file upload and download
- ⏱️ **Auto-deletes file after 30 seconds** (timing is adjustable)
- ✉️ Key delivery through EmailJS
- 🔒 Firebase email/password-based authentication
- 🔁 Auto file deletion post-download
- 💡 Modern UI with TailwindCSS
- ⚙️ Framer Motion for smooth transitions

---

## Tech Stack

- **Frontend**: ReactJS, TailwindCSS, Framer Motion  
- **Encryption**: AES-256 (Web Crypto API)  
- **Authentication**: Firebase Auth  
- **Email Service**: EmailJS  
- **Build Tool**: Vite (or Create React App)

---

## AES-256 Encryption Explained

**AES-256** is a symmetric encryption algorithm that uses a 256-bit key. It is widely used for high-grade encryption due to its strength and performance.

**Encryption Flow in SECURO:**

1. User selects a file
2. A random AES-256 key (32 bytes) and IV (16 bytes) are generated using `window.crypto`
3. File is encrypted using `AES-GCM` mode
4. Encrypted file is downloaded
5. The AES key and IV are sent to the user’s email using EmailJS

---

## Architecture

```text
User Interface (React)
       ↓
User Registration / Login → Firebase Auth
       ↓
File Selection
       ↓
AES-256 Encryption (Web Crypto API)
       ↓
Encrypted File Download
       ↓
Send AES Key + IV → EmailJS → Registered Email
```

---

## Getting Started

### Prerequisites

Ensure the following are installed on your system:

- Node.js & npm  
- Git  
- Internet connection for Firebase & EmailJS setup

---

### ⚙️ Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/your-username/securo.git
cd securo
npm install
```

---

## Firebase Configuration

1. Visit [Firebase Console](https://console.firebase.google.com)
2. Click **“Add project”** → Enter a project name → Continue
3. Go to **Authentication → Sign-in Method**
   - Enable **Email/Password**
4. Go to **Project Settings → Web App** (</>)
   - Register your app and copy the config

Create a new file `src/firebaseConfig.js` and paste:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

## EmailJS Integration

1. Go to [EmailJS](https://www.emailjs.com) → Create an account
2. Add a **new email service** (e.g., Gmail)
3. Navigate to **Email Templates** → Create one with:
   - Template ID: `template_xyz`
   - Variables: `to_email`, `aes_key`, `iv_key`

4. Get your **Service ID**, **Template ID**, and **Public Key** from:
   - Dashboard → Account → API Keys

Update `src/emailHelper.js`:

```javascript
import emailjs from "emailjs-com";

export const sendKeysByEmail = (recipient, aesKey, ivKey) => {
  const templateParams = {
    to_email: recipient,
    aes_key: aesKey,
    iv_key: ivKey,
  };

  return emailjs.send(
    "your_service_id",
    "your_template_id",
    templateParams,
    "your_public_key"
  );
};
```

---

## Usage Guide

1. Run the app:

```bash
npm start
```

2. Navigate to `http://localhost:3000`
3. Register with your email and login
4. Upload a file → it gets encrypted
5. Download the encrypted file
6. AES key & IV are emailed to you
7. Use the **Decryption** option to re-upload and decrypt

---

## Folder Structure

```
securo/
│
├── public/
├── src/
│   ├── components/        # UI Components (Navbar, Form, etc.)
│   ├── pages/             # Home, Login, Register, Encrypt, Decrypt
│   ├── firebaseConfig.js  # Firebase setup
│   ├── emailHelper.js     # EmailJS setup
│   └── App.js             # Root component
│
├── tailwind.config.js
├── package.json
└── README.md
```

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for:

- Feature additions
- Bug fixes
- UI improvements
- Documentation updates

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
---
