import firebase from "firebase/app";
import fireBase from "firebase";
import "firebase/auth";
let firebaseConfig = {};
let db={};
if (!firebase.apps.length) {
    firebaseConfig = firebase.initializeApp({
        apiKey: "AIzaSyAE83wWJm2Dm-tNS4PIQGv1qPWOLIo7BVc",
        authDomain: "fir-react-9a568.firebaseapp.com",
        projectId: "fir-react-9a568",
        storageBucket: "fir-react-9a568.appspot.com",
        messagingSenderId: "39424888659",
        appId: "1:39424888659:web:c8da7defa83b2bc0701ba6"
    });
    db=fireBase.firestore();
}
else {
    firebaseConfig = firebase.app();
    db=fireBase.firestore();
}
export  {firebaseConfig as default, db};