const express = require('express')
const router = express.Router()
const { signUp, login, updateUser, user, findUserByViaje, existeCorreo, updatePassword } = require('./../controller/userController')
//const { signUp, login, logout, user, findUserByViaje, updateUser } = require('./../controller/userController')
const { home, registrarViaje, reservarViaje } = require('./../controller/viajesController')
const { addNewReview, review, findAllReviews  } = require('./../controller/reviewController')

// STRIPE
const { checkout, success, cancel } = require('./../controller/stripeController')
// const authenticateToken = require('./../auth/authMiddleware')

// RUTAS DE AUTENTICACION IMPLEMENTADAS EN FRONT
router.post('/login', login)
router.put('/updateUser', updateUser)
router.get('/user/:email', user)
router.get('/userfind/:email', existeCorreo)
router.get('/updatePassword/:email/:password', updatePassword)
router.post('/user/findUserByViaje', findUserByViaje)
router.post('/signup', signUp)

router.get('/home', home)
router.post('/home/registrarViaje', registrarViaje)

router.post('/registrarviaje', registrarViaje)
router.post('/reservarviaje', reservarViaje)

router.post('/history', addNewReview)
router.post('/history/findReview', review)
router.post('/history/findAllReviews', findAllReviews) 

// STRIPE
router.post('/create-checkout-session', checkout)
router.get('/success', success)
router.get('/cancel', cancel)

module.exports = router