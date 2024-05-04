const jwt = require('jsonwebtoken')
const User = require('../models/User')

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    
    // BUSCAMOS EL USUARIO PARA VERIFICAR QUE EXISTE EL CORREO ELECTRONICO
    // AHORA CON FIREBASE-ADMIN SOLO LO PONEMOS ASI
    const userDoc = await User.findByEmail(email)
  
    // SI NO EXISTE EL USUARIO
    if (!userDoc) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    // VERIFICAMOS SI EL PASSWORD ES CORRECTO
    const isValidPass = await userDoc.verifyPassword(password)
    
    if(!isValidPass) {
      return res.status(401).json({
        message: 'Invalid Credentials'
      })
    }

    // GENERAR EL TOKEN
    const token = jwt.sign({ email: userDoc.email }, process.env.SECRET, { expiresIn: '1h' })
    res.status(200).json({ 
      message: 'success',
      token
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const signUp = async (req, res) => {
  try {
    const { nombre, apaterno, amaterno, direccion, telefono, email, password } = req.body
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    const newUser = await User.createUser(nombre, apaterno, amaterno, direccion, telefono, email, password)
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.getAllUser()
//     res.json ({
//       users,
//       message: 'success'
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: 'Internal Server Error',
//       error: error
//     })
//   }
// }

// const deleteUser = async (req, res) => {
//   const userEmail = req.params.email
//   try {
//     await User.deleteUser(userEmail)
//     res.status(204).send()
//   } catch (error) {
//     res.status(500).json({
//       message: 'Internal Server Error'
//     })
//   }
// }

// const updateUser = async (req, res) => {
//   const userEmail = req.params.email
//   const userData = req.body
//   try {
//     const userUpdated = await User.updateUser(userEmail, userData)
//     res.json({
//       userUpdated,
//       message: 'success'
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: 'Internal Server Error'
//     })
//   }
// }

module.exports = { signUp, login }