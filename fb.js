 
import firebase from 'firebase/app';
import 'firebase/firestore'

// const settings = { timestampsInSnapshots: true }

const config = {
    apiKey: "AIzaSyCPz3uI0dnJzz-ev2TNq7fQLOtFOy8fZE4",
    authDomain: "heroesng2-19571.firebaseapp.com",
    databaseURL: "https://heroesng2-19571.firebaseio.com",
    projectId: "heroesng2-19571",
    storageBucket: "heroesng2-19571.appspot.com",
    messagingSenderId: "552210936517",
    appId: "1:552210936517:web:db441c9e55564b1da536ac"
  };

firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true})

export default db;