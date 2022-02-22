// firebaseClient.ts

import * as firebase from 'firebase/app';
import 'firebase/auth';


const clientCredentials = {
    apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.PUBLIC_FIREBASE_APP_ID,
};



if (!firebase.apps.length) {
    firebase.initializeApp({ clientCredentials });
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export { firebase };