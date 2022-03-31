import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD5xVenuvIha8nHc9I6eVrG8gCMDOkb_5M",
    authDomain: "psykokwak-532ef.firebaseapp.com",
    projectId: "psykokwak-532ef",
    storageBucket: "psykokwak-532ef.appspot.com",
    messagingSenderId: "999158494432",
    appId: "1:999158494432:web:2ad16cce71e3675b488c85",
    measurementId: "G-19YTYF62S8"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;