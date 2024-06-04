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
      
      const review = await Review.findReview(viaje, usuario)
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

const findAllReviews = async (req, res) => {
  try {
      const { viaje } = req.body
      const reviews = await Review.findAllReviews(viaje)
      if (reviews.length === 0) {
          return res.status(200).json({
              message: 'NO SE ENCONTRARON RESEÑAS',
              success: false
          })
      }
      return res.status(200).json({
          message: 'RESEÑAS ENCONTRADAS',
          success: true,
          reviews
      })
  } catch (error) {
      console.log('ERROR =>', error)
      res.status(500).json({
          message: 'INTERNAL SERVER ERROR',
          success: false,
          error
      })
  }
}

module.exports = { addNewReview, review, findAllReviews }