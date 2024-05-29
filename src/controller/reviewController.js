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

module.exports = {addNewReview}