import { getFirestore } from "firebase/firestore"; 


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8s_cdxOnl8sXIIYtKauUrjpLMgvyH3qU",
  authDomain: "notion-clone-8c064.firebaseapp.com",
  projectId: "notion-clone-8c064",
  storageBucket: "notion-clone-8c064.firebasestorage.app",
  messagingSenderId: "841671381218",
  appId: "1:841671381218:web:81c94f395a8104e8828ebb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };