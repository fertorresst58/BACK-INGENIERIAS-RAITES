const connection = require('../config/mysql')
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

	static async findReview (viaje, usuario) {
		try {
			const query = 'SELECT * FROM resenas WHERE res_via_id = ? AND res_usu_id = ?'
			const reviewDoc = await con.query(query, [viaje, usuario])

			if (reviewDoc.length > 0) {
				const newReview = new Review (
					reviewDoc[0].res_id,
					reviewDoc[0].res_via_id,
					reviewDoc[0].res_usu_id,
					reviewDoc[0].res_puntuacion,
					reviewDoc[0].res_comentario,
					reviewDoc[0].res_fecha
				)
				return newReview
			} else {
				return null;
			}
		} 
		catch(err) {
			return null;
		}
	}

	static async findAllReviews(viaje) {
        try {
            const query = 'SELECT r.*, u.usu_nombre, u.usu_apaterno, u.usu_amaterno, u.usu_img FROM resenas r INNER JOIN usuarios u ON r.res_usu_id = u.usu_id WHERE r.res_via_id = ?;'
            const reviewDocs = await connection.query(query, [viaje])
            if (reviewDocs.length > 0) {
                const reviews = reviewDocs.map(doc => ({
                    id: doc.res_id,
                    viaje: doc.res_via_id,
                    usuario: doc.res_usu_id,
                    puntuacion: doc.res_puntuacion,
                    comentario: doc.res_comentario,
                    fecha: doc.res_fecha,
					nombre: doc.usu_nombre,
                    apaterno: doc.usu_apaterno,
                    amaterno: doc.usu_amaterno,
					imagen: doc.usu_img
                }))
                return reviews
            } else {
                return []
            }
        } catch (err) {
            console.log('ERROR =>', err)
            throw new Error('ERROR AL RECUPERAR LAS RESEÑAS')
        }
    }
}

module.exports = Review