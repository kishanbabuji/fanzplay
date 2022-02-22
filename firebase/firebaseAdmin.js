import * as firebaseAdmin from 'firebase-admin';



if (firebaseAdmin.apps.length == 0) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: process.env.private_key,
            clientEmail: process.env.client_email,
            projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
        }),
        databaseURL: 'https://fanzplay-95bfa.firebaseio.com',
    });
}
console.log(firebaseAdmin)

export default { firebaseAdmin };