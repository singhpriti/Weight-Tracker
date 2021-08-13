import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyB-jm1gb3UnHnVhC6ZJrWx6WufoIB45DlM",
    authDomain: "weight-tracker-582a4.firebaseapp.com",
    projectId: "weight-tracker-582a4",
    storageBucket: "weight-tracker-582a4.appspot.com",
    messagingSenderId: "774024554123",
    appId: "1:774024554123:web:a91e29b57ec71defddd68e",
    measurementId: "G-6KJ32T2TSQ"
};

const Firebase = firebase.initializeApp(firebaseConfig);
const db = Firebase.firestore();
const auth = Firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider, db };



export default Firebase;


