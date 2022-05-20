
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDTF_hxXFJALbtBNz-EwagHqq5DuWL-7jU",
    authDomain: "e-comm-vue.firebaseapp.com",
    projectId: "e-comm-vue",
    storageBucket: "e-comm-vue.appspot.com",
    messagingSenderId: "1036382866302",
    appId: "1:1036382866302:web:3830263c0da99d0432412f"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore()
export {db,app}