import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD6YmhifirS3kmEIEBA0HwK0-13AMLyiEQ",
    authDomain: "refined-aria-413310.firebaseapp.com",
    projectId: "refined-aria-413310",
    storageBucket: "refined-aria-413310.appspot.com",
    messagingSenderId: "1095037775759",
    appId: "1:1095037775759:web:82f48ede38762fbeeb65fa",
    measurementId: "G-4MFJZHBFE2"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);