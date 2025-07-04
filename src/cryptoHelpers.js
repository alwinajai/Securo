// cryptoHelpers.js

// Generate a 256-bit AES-GCM key
export async function generateAESKey() {
  return await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

// Encrypt the file using AES-GCM
export async function encryptFile(file, key) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
  const data = await file.arrayBuffer(); // Convert file to bytes

  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  return { encryptedData: new Uint8Array(encrypted), iv };
}

//Decryption//

// Convert Base64 string to Uint8Array
export function base64ToBytes(base64) {
  const binary = atob(base64);
  return new Uint8Array([...binary].map(char => char.charCodeAt(0)));
}

// Import AES key from base64
export async function importAESKey(base64Key) {
  const rawKey = base64ToBytes(base64Key);
  return await window.crypto.subtle.importKey(
    "raw",
    rawKey,
    "AES-GCM",
    true,
    ["decrypt"]
  );
}

// Decrypt encrypted data
export async function decryptFile(encryptedData, key, iv) {
  try {
    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encryptedData
    );
    return new Blob([decrypted]); // Return decrypted file as Blob
  } catch (err) {
    throw new Error("Decryption failed. Please check your key and IV.");
  }
}