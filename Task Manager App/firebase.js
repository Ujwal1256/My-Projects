const firebaseConfig = {
  apiKey: "AIzaSyA7zNbNU7PnM__wctJ8BiWzIFg_WFzaJwo",
  authDomain: "task-manager-app-ef72e.firebaseapp.com",
  projectId: "task-manager-app-ef72e",
  storageBucket: "task-manager-app-ef72e.appspot.com",
  messagingSenderId: "388572011493",
  appId: "1:388572011493:web:fd7153ecce4612c5316d0c",
  measurementId: "G-HQVC0HFKYS",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
