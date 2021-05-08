// import firebase from 'firebase/app'
import firebase from 'firebase'
import 'firebase/firestore'
// import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  })
}

export default (context, inject) => {
  inject('firebase', firebase)
  // inject('firestore', firebase.firestore())
  // inject('auth', firebase.auth())
}
