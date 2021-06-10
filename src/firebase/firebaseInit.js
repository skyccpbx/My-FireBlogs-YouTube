import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyCZFxcVghFjLbmRGviJlTtJz6Nir8n2iZc',
  authDomain: 'fireblogsbx.firebaseapp.com',
  projectId: 'fireblogsbx',
  storageBucket: 'fireblogsbx.appspot.com',
  messagingSenderId: '411053925780',
  appId: '1:411053925780:web:5757626cb09c7ef55ddb81',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp }
export default firebaseApp.firestore()
