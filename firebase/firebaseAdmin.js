import * as firebaseAdmin from 'firebase-admin';



if (firebaseAdmin.apps.length == 0) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: process.env.private_key,
            clientEmail: process.env.client_email,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        }),
        databaseURL: 'https://mpower-bf060.firebaseio.com',
    });
}
console.log(firebaseAdmin)

export { firebaseAdmin };