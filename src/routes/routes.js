const express = require('express')
const router = express.Router()
const { signUp, login } = require('./../controller/userController')
// const authenticateToken = require('./../auth/authMiddleware')

router.post('/signup', signUp)
router.post('/login', login)
// router.get('/get-all-users', authenticateToken, getAllUsers)
// router.delete('/users/:email', authenticateToken, deleteUser)
// router.put('/users/:email', authenticateToken, updateUser)

module.exports = router