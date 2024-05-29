const con = require('../config/mysql')
const IReview = require('../interfaces/IReview')
const { query } = require('express')

class Review extends IReview{
    constructor(id, viaje, usuario, puntuacion, comentario, fecha) {
		super()
        this.id = id
        this.viaje = viaje
        this.usuario = usuario
        this.puntuacion = puntuacion
        this.comentario = comentario
        this.fecha = fecha
    }

    static async createReview(viaje, usuario, puntuacion, comentario, fecha) {
		try {
			const query = 'INSERT INTO `resenas` ' + 
			'(res_via_id, res_usu_id, res_puntuacion, res_comentario, res_fecha) ' + 
			'VALUES (?, ?, ?, ?, ?)'
      		await con.query(query, [
				viaje,
				usuario,
				puntuacion,
				comentario,
				fecha
			])

			return new Review(viaje, usuario, puntuacion, comentario, fecha)
		} 
		catch (err) {
			console.log('ERROR =>', err)
			throw new Error('ERROR AL REGISTRAR LA NUEVA RESENIA')
		}
	}
}

module.exports = Review