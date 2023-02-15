const express = require ('express')
const bcrypt  = require ('bcrypt')
const { initializeApp } = require ('firebase/app')
const {getFirestore } = require ('firebase/firestore')
require("dotenv/config")

// Configuracion de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDsrkk0DJejStNYOFYGg7CmeYGfrl3lsWw",
    authDomain: "fir-88f4f.firebaseapp.com",
    projectId: "fir-88f4f",
    storageBucket: "fir-88f4f.appspot.com",
    messagingSenderId: "153128440092",
    appId: "1:153128440092:web:8a01db28205a9544d9ead9"
  };

// Inicializar BD con FireBase 
const firebase = initializeApp(firebaseConfig)
const db = getFirestore()

// Inicializar el servidor
const app = express()

const PORT = process.env.PORT || 19000

//Ejecutamos el servidor 
app.listen(PORT => {
    console.log(`Escuchando en el puerto: ${PORT}`)
})