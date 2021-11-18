import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    sendSignInLinkToEmail,
} from 'firebase/auth';

const apikey = process.env.REACT_APP_API_KEY;
const authdomain = process.env.REACT_APP_AUTH_DOMAIN;
const projectid = process.env.REACT_APP_PROJECT_ID;
const storagebucket = process.env.REACT_APP_STORAGE_BUCKET;
const messagingsenderid = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appid = process.env.REACT_APP_APP_ID;
const measurementid = process.env.REACT_APP_MEASUREMENT_ID;

const firebaseConfig = {
    apiKey: apikey,
    authDomain: authdomain,
    projectId: projectid,
    storageBucket: storagebucket,
    messagingSenderId: messagingsenderid,
    appId: appid,
    measurementId: measurementid,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function logOut() {
    return signOut(auth);
}

export function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) =>
            setCurrentUser(user)
        );
        return unSubscribe;
    }, []);

    return currentUser;
}

// const actionCodeSettings = {
//     // URL you want to redirect back to. The domain (www.example.com) for this
//     // URL must be in the authorized domains list in the Firebase Console.
//     url: 'http://google.com',
//     // This must be true.
//     handleCodeInApp: true,

//     // dynamicLinkDomain: 'example.page.link',
// };

// //   import { getAuth,  } from "firebase/auth";

// export function signWithLink(email) {
//     return sendSignInLinkToEmail(auth, email, actionCodeSettings);
//     // .then(() => {
//     //     // The link was successfully sent. Inform the user.
//     //     // Save the email locally so you don't need to ask the user for it again
//     //     // if they open the link on the same device.
//     //     window.localStorage.setItem('emailForSignIn', email);
//     //     // ...
//     // })
//     // .catch((error) => {
//     //     const errorCode = error.code;
//     //     const errorMessage = error.message;
//     //     // ...
//     // });
// }

export { db };
