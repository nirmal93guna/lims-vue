import Vue from 'vue'
import Firebase from 'firebase'
import VueFire from 'vuefire'

Vue.use(VueFire);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAh_MUfUolX2B8onJ6v8bhREYfuz1ocAhE",
  authDomain: "vue-lims.firebaseapp.com",
  databaseURL: "https://vue-lims.firebaseio.com",
  projectId: "vue-lims",
  storageBucket: "vue-lims.appspot.com",
  messagingSenderId: "259311485778"
};

const FireBaseApp = Firebase.initializeApp(config);
const FireDB = FireBaseApp.database();
// const Auth = FireBaseApp.auth();
// const firebase = function(uid) {
//   return {
//     contacts: FireDB.ref(`contacts/${uid}`)
//   }
// }
// const isConnected = FireDB.ref('.info/connected');
const isConnected = FireDB.ref('items');

export {
  firebase,
  isConnected,
//   Auth
}
