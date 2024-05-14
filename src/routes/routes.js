const express = require('express')
const router = express.Router()
const { signUp, login, logout, user } = require('./../controller/userController')
// const authenticateToken = require('./../auth/authMiddleware')

// RUTAS DE AUTENTICACION IMPLEMENTADAS EN FRONT
router.post('/login', login)
router.post('logout', logout)
router.get('/user/:email', user)

router.post('/signup', signUp)
// router.get('/get-all-users', authenticateToken, getAllUsers)
// router.delete('/users/:email', authenticateToken, deleteUser)
// router.put('/users/:email', authenticateToken, updateUser)

module.exports = router