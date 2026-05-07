import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-interview-e4e39.firebaseapp.com",
  projectId: "ai-interview-e4e39",
  storageBucket: "ai-interview-e4e39.firebasestorage.app",
  messagingSenderId: "759730107769",
  appId: "1:759730107769:web:83bb0c322dc8d5e3b8aba8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }