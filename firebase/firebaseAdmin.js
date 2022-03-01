import * as firebaseAdmin from 'firebase-admin';

import { private_key, PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_PROJECT_ID } from "@envLocal";



if (firebaseAdmin.apps.length == 0) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: private_key,
            clientEmail: client_email,
            projectId: PUBLIC_FIREBASE_PROJECT_ID,
        }),
        databaseURL: 'https://fanzplay-95bfa-default-rtdb.firebaseio.com/',
    });
}
console.log(firebaseAdmin)

export default { firebaseAdmin };