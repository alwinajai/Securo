// src/emailHelper.js
import emailjs from "emailjs-com";

export const sendKeysByEmail = (recipient, aesKey, ivKey) => {
  const templateParams = {
    to_email: recipient,   // 👈 This should match your template variable name
    aes_key: aesKey,
    iv_key: ivKey
  };

  return emailjs.send(
    "service_4y23wmw",     // Your EmailJS Service ID
    "template_2aytzq7",    // Your EmailJS Template ID
    templateParams,
    "hvpvdCtPZtwVWt79d"     // Your EmailJS Public Key
  );
};
