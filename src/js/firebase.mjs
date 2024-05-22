// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOldxszY5NokTC-9GJHYL6CS2xUHs6JuY",
  authDomain: "book-platform-92fc8.firebaseapp.com",
  projectId: "book-platform-92fc8",
  storageBucket: "book-platform-92fc8.appspot.com",
  messagingSenderId: "844344224692",
  appId: "1:844344224692:web:bb2fb3fba3f235a1b320e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;
