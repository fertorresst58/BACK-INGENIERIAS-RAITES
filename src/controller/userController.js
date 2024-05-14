const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv').config()

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    
    // BUSCAMOS EL USUARIO PARA VERIFICAR QUE EXISTE EL CORREO ELECTRONICO
    const userDoc = await User.findUser(email)
  
    // SI NO EXISTE EL USUARIO
    if (!userDoc) {
      return res.status(404).json({
        message: 'USUARIO NO ENCONTRADO',
        success: false
      })
    }

    // VERIFICAMOS SI EL PASSWORD ES CORRECTO
    const isValidPass = await userDoc.verifyPassword(password)
    if(!isValidPass) {
      return res.status(401).json({
        message: 'CREDENCIALES INVALIDAS',
        success: false
      })
    }

    // GENERAR EL TOKEN
    const token = jwt.sign(
      { email: userDoc.email },
      process.env.SECRET,
      { expiresIn: '1h' })

    res.status(200).json({ 
      success: true,
      token,
      user: userDoc
    })
  } catch (error) {
    res.status(500).json({
      message: 'INTERNAL SERVER ERROR',
      success: false,
      error
    })
  }
}

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({ 
        message: 'Token de autorización no proporcionado',
        success: false
      })
    }

    User.logoutUser(token, (err) => {
      if (err) {
        return res.status(401).json({
          error: err,
          success: false
        })
      }
      res.status(200).json({
        message: 'Logout exitoso',
        success: true
      })
    })
  } catch (error) {
    res.status(500).json({
      message: 'INTERNAL SERVER ERROR',
      success: false,
      error
    })
  }
}

const user = async (req, res) => {
  console.log("🚀 ~ user ~ req:", req)
  try {
    const email = req.params.email
    
    // BUSCAMOS EL USUARIO PARA VERIFICAR QUE EXISTE EL CORREO ELECTRONICO
    const user = await User.findUser(email)
  
    // SI NO EXISTE EL USUARIO
    if (!user) {
      return res.status(404).json({
        message: 'USUARIO NO ENCONTRADO',
        success: false
      })
    } 
    
    const isValidPass = await user.verifyPassword(password)
    if(!isValidPass) {
      return res.status(401).json({
        message: 'CREDENCIALES INVALIDAS',
        success: false
      })
    }
    
    return res.status(200).json({
      message: 'USUARIO ENCONTRADO',
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      message: 'INTERNAL SERVER ERROR',
      success: false,
      error
    })
  }
}

const signUp = async (req, res) => {
  try {
    const { nombre, apaterno, amaterno, sexo, email, password, telefono, carrera, fechaNac } = req.body
    
    const existingEmail = await User.findByEmail(email)
    if (existingEmail) {
      return res.status(400).json({
        message: 'EMAIL YA ESTA REGISTRADO',
        success: false
      })
    }

    const newUser = await User.createUser(nombre, apaterno, amaterno, sexo, email, password, telefono, carrera, fechaNac)
    res.status(201).json({
      message: 'USUARIO REGISTRADO SATISFACTORIAMENTE',
      success: true,
      user: newUser
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      success: false
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

module.exports = { signUp, login, logout, user }