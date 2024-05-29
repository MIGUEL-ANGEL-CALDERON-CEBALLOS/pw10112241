import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnfoHDMIqxXkiXCA1Ti_jGEiAkrxSL_Ss",
  authDomain: "tienda-87aa6.firebaseapp.com",
  projectId: "tienda-87aa6",
  storageBucket: "tienda-87aa6.appspot.com",
  messagingSenderId: "369718161529",
  appId: "1:369718161529:web:29b20d2855320b09d324a8"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')
