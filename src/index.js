import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTmiwnCBnyeu9z4wufS4ZRMjKVpTKfvps",
  authDomain: "todo-app-f3f47.firebaseapp.com",
  databaseURL:
    "https://todo-app-f3f47-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-app-f3f47",
  storageBucket: "todo-app-f3f47.appspot.com",
  messagingSenderId: "373782329507",
  appId: "1:373782329507:web:66c440d3b45148b6102716",
};

export const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
