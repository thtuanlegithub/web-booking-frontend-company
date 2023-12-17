// firebase.js

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDSEzBchqJEtmcacoVFsn8gh0eFhV_ozCE",
    authDomain: "webbooking-2460b.firebaseapp.com",
    projectId: "webbooking-2460b",
    storageBucket: "webbooking-2460b.appspot.com",
    messagingSenderId: "715287388351",
    appId: "1:715287388351:web:be08ae4a0e986e5b8f260a",
    measurementId: "G-J2FLN8G0FQ"
}

const app = initializeApp(firebaseConfig);

export { app };
