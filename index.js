const express = require('express')
const bcrypt = require('bcrypt')
const {initializeApp} = require('firebase/app')
const {getFirestore, collection , getDoc, doc, setDoc} = require('firebase/firestore')
require('dotenv/config')

// Configuracion de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDsrkk0DJejStNYOFYGg7CmeYGfrl3lsWw",
    authDomain: "fir-88f4f.firebaseapp.com",
    projectId: "fir-88f4f",
    storageBucket: "fir-88f4f.appspot.com",
    messagingSenderId: "153128440092",
    appId: "1:153128440092:web:8a01db28205a9544d9ead9"
  };

//Inicia BD 
const firebase= initializeApp(firebaseConfig)
const db = getFirestore()

//Inicializar el servidor
const app = express()

app.use(express.json())

//Ruta para las peticiones
app.post('/registro', (req, res) =>{
  const{ name, lastname, email, password, number} = req.body

  //Validaciones de los datos
  if(name.length <= 3){
    res.json({
      'alert': 'Nombre requiere minimo 3 caracters'
    })
  }else if (lastname.length <3){
    res.json({
      'alert': 'Apellido requiere minimo 3 caracteres'
    })
  }else if (!email.length){
    res.json({
      'alert': 'Debes escribir correo electronico'
    })
  }else if (password.length < 8){
    res.json({
      'alert': 'Password requiere minimo 8 caracteres'
    })
  }
  else if (!Number(number) || number.length <10){
    res.json({
      'alert': 'Introduce un numero de telefono correcto'
    })
  } else {
    const users = collection(db, 'users')

    getDoc(doc(users,email)).then(user =>{
      if(user.exists()){
        res.json({
          'alert': 'El correo ya existe'
        })
      }else{
        bcrypt.genSalt(10, (err, salt) =>{
          bcrypt.hash(password, salt, (err, hash) =>{
            req.body.password = hash

            //Guardar en la base de datos
            setDoc(doc(users, email), req.body).then(() =>{
              res.json({
                'alert': 'success'
              })
            })
          })
        })
      }
    })
  }
})

 app.get('/usuarios', (req, res) =>{
  const users = collection(db, 'users')
  console.log('Usuarios', users)
  res.json({
    'alert': 'success',
    data
  })
 })


 app.get('/usuarios', async (req, res) =>{
  const colRef = collection(db, 'users')
  const docsSnap = await getDocs(colRef)
  let data = []
  docsSnap.forEach(doc => {
    data.push(doc.data())
  })
  res.json({
    'alert': 'success',
    data
 })
 })

app.post('/login', (req, res) =>{
  let { email, password } = req.body

  if(!email.length || !password.length) {
    return res.json({
      'alert': 'No se han recibido los datos correctamente'
    })
  }

  const users = collection(db, 'users')
  getDoc(doc(users, email))
  .then( user => {
    if(!user.exists()){
      return res.json({
        'alert': 'Correo no registrado en la base de datos'
    })
    }else {
      bcrypt.compare(password, user.data().password, (error, result) => {
        if(result) {
          let data = user.data()
          res.json({
            'alert': 'Success',
            name: data.name,
            email: data.email
          })
        } else {
            return res.json({
              'alert': 'Password Incorrecto'
            })
        }
      })
    }
  })
})

const PORT = process.env.PORT||19000

//ejecutamos el servidor
app.listen(PORT, () =>{
  console.log(`Escuchando en el puerto:  ${PORT}`)
})