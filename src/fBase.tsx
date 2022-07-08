import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDMHBQtARBXGrDavzzc-uC6wyutFD__Thk",
    authDomain: "nwitter-a1928.firebaseapp.com",
    projectId: "nwitter-a1928",
    storageBucket: "nwitter-a1928.appspot.com",
    messagingSenderId: "358743743635",
    appId: "1:358743743635:web:0461c5856dcfbb4c074166",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
