const Review = require('../models/reviewModel')
require('dotenv').config()

const addNewReview = async (req, res) => {
    try {
        const { viaje, usuario, puntuacion, comentario, fecha } = req.body

        const newReview = await Review.createReview(viaje, usuario, puntuacion, comentario, fecha)
        res.status(201).json({
        message: 'REVIEW REGISTRADA SATISFACTORIAMENTE',
        success: true,
        review: newReview
        })
    } catch (error) {
        res.status(500).json({
        message: 'Internal Server Error',
        success: false
        })
    }
}

const review = async (req, res) => {
    console.log("🚀 ~ review ~ req:", req)
    try {
      const { viaje, usuario } = req.body
      
      // BUSCAMOS EL USUARIO PARA VERIFICAR QUE EXISTE EL CORREO ELECTRONICO
      const review = await Review.findReview(viaje, usuario)
    
      // SI NO EXISTE EL USUARIO
      if (!review) {
        return res.status(200).json({
          message: 'NO EXISTE REVIEW',
          success: true,
          review
        })
      } 
      
      return res.status(200).json({
        message: 'REVIEW ENCONTRADA',
        success: true,
        review
      })
    } catch (error) {
      res.status(500).json({
        message: 'INTERNAL SERVER ERROR',
        success: false,
        error
      })
    }
}

module.exports = { addNewReview, review }