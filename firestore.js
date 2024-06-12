
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"




const firebaseConfig = {
    apiKey: "AIzaSyDKOQW3s6i0FafTUkL9w2TDcL_xhOHVS6Q",
    authDomain: "evalucion3-972fe.firebaseapp.com",
    projectId: "evalucion3-972fe",
    storageBucket: "evalucion3-972fe.appspot.com",
    messagingSenderId: "733164838917",
    appId: "1:733164838917:web:a7d6cde38a79eaafa07c6c",
    measurementId: "G-JS5HTLCDJP"
  };


const app = initializeApp(firebaseConfig)

const db = getFirestore(app)


export const save = (Empeños) => {
   
   
    addDoc(collection(db, 'Empeño'), Empeños)
}


export const getData = (data) => {
    
    onSnapshot(collection(db, 'Empeño'), data)
}


export const remove = (id) => {

    deleteDoc(doc(db, 'Empeño', id))
}


export const getDocumento = (id) => getDoc(doc(db, 'Empeño', id))


export const update = (id,emp) =>{
    
    updateDoc(doc(db,'Empeño',id),emp)
}