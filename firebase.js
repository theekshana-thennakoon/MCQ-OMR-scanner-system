import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDXXoxUHfLZHn_NEr7QDjQt0-7pI2XLBI0",
    authDomain: "mcq-mark-40623.firebaseapp.com",
    projectId: "mcq-mark-40623",
    storageBucket: "mcq-mark-40623.firebasestorage.app",
    messagingSenderId: "149101086740",
    appId: "1:149101086740:web:ff5fc359b28c686e433f01"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);