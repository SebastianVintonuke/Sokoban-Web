import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyQv7N_0H6qPnvIu2UI0JN3ExBGwZf3II",
  authDomain: "sokoban-vue.firebaseapp.com",
  projectId: "sokoban-vue",
  storageBucket: "sokoban-vue.appspot.com",
  messagingSenderId: "67881262284",
  appId: "1:67881262284:web:594b8d8ca852571f06b669"
};

export const APP = initializeApp(firebaseConfig);
export const DB = getFirestore();