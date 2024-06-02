const con = require('../config/mysql')
const IUser = require('../interfaces/IUser')
const bcrypt = require('bcrypt')

class User extends IUser {
	constructor(id, nombre, apaterno, amaterno, sexo, email, password, telefono, carrera, fechaNac, des, img, ciudad, campus) {
		super()
		this.id = id
		this.nombre = nombre
		this.apaterno = apaterno
		this.amaterno = amaterno
		this.sexo = sexo
		this.email = email
		this.password = password
		this.telefono = telefono
		this.carrera = carrera
		this.fechaNac = fechaNac
		this.des = des
		this.img = img
		this.ciudad = ciudad
		this.campus = campus
	}

	static async createUser(nombre, apaterno, amaterno, sexo, email, password, telefono, carrera, fechaNac, campus) {
		try {
			const hash = await bcrypt.hash(password, 10)
			const query = 'INSERT INTO `usuarios` ' + 
			'(usu_nombre, usu_apaterno, usu_amaterno, usu_sexo, usu_email, usu_password, usu_telefono, usu_carrera, usu_fecha_nac, usu_campus) ' + 
			'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      		await con.query(query, [
				nombre,
				apaterno,
				amaterno,
				sexo,
				email,
				hash,
				telefono,
				carrera,
				fechaNac,
				campus
			])

			return new User(nombre, apaterno, amaterno, sexo, email, password, telefono, carrera, fechaNac, campus)
		} 
		catch (err) {
			console.log('ERROR =>', err)
			throw new Error('ERROR AL REGISTRAR AL NUEVO USUARIO')
		}
	}

	async verifyPassword (password) {
		return await bcrypt.compare(password, this.password)
	}

	static async findUser (email) {
		try {
      const query = 'SELECT * FROM usuarios WHERE usu_email = ?'
      const userDoc = await con.query(query, [email])

			if (userDoc.length > 0) {
				const newUser = new User (
					userDoc[0].usu_id,
					userDoc[0].usu_nombre,
					userDoc[0].usu_apaterno,
					userDoc[0].usu_amaterno,
					userDoc[0].usu_sexo,
					userDoc[0].usu_email,
					userDoc[0].usu_password,
					userDoc[0].usu_telefono,
					userDoc[0].usu_carrera,
					userDoc[0].usu_fecha_nac,
					userDoc[0].usu_des,
					userDoc[0].usu_img,
					userDoc[0].usu_ciudad,
					userDoc[0].usu_campus
				)
				return newUser
			}
			return null
		} 
		catch(err) {
			console.log('Error => ', err)
			throw new Error('NO SE ENCONTRO AL USUARIO')
		}
	}

	static async findUserPorID(id) {
		try {
      const query = 'SELECT * FROM usuarios WHERE usu_id = ?'
      const userDoc = await con.query(query, [id])

			if (userDoc.length > 0) {
				const newUser = new User (
					userDoc[0].usu_id,
					userDoc[0].usu_nombre,
					userDoc[0].usu_apaterno,
					userDoc[0].usu_amaterno,
					userDoc[0].usu_sexo,
					userDoc[0].usu_email,
					userDoc[0].usu_password,
					userDoc[0].usu_telefono,
					userDoc[0].usu_carrera,
					userDoc[0].usu_fecha_nac,
					userDoc[0].usu_des,
					userDoc[0].usu_img,
					userDoc[0].usu_ciudad,
					userDoc[0].usu_campus
				)
				return newUser
			}
			return null
		} 
		catch(err) {
			console.log('Error => ', err)
			throw new Error('NO SE ENCONTRO AL USUARIO')
		}
	}

	static async findUserByViaje (viaje) {
		try {
      const query = 'SELECT u.* FROM publicar p JOIN usuarios u ON p.pub_usu_id = u.usu_id WHERE p.pub_via_id = ?'
      const userDoc = await con.query(query, [viaje])

			if (userDoc.length > 0) {
				const newUser = new User (
					userDoc[0].usu_id,
					userDoc[0].usu_nombre,
					userDoc[0].usu_apaterno,
					userDoc[0].usu_amaterno,
					userDoc[0].usu_sexo,
					userDoc[0].usu_email,
					userDoc[0].usu_password,
					userDoc[0].usu_telefono,
					userDoc[0].usu_carrera,
					userDoc[0].usu_fecha_nac,
					userDoc[0].usu_des,
					userDoc[0].usu_img,
					userDoc[0].usu_ciudad,
					userDoc[0].usu_campus
				)
				return newUser
			}
			return null
		} 
		catch(err) {
			console.log('Error => ', err)
			throw new Error('NO SE ENCONTRO AL USUARIO')
		}
	}

	static async logoutUser(token, callback) {
		// Verifica si el token es válido
		try {
			const decodedToken = jwt.verify(token, process.env.SECRET)
			// Token válido, el usuario está autenticado
			// No se requiere realizar ninguna acción específica en el backend para logout,
			// ya que el token será invalidado automáticamente en el cliente
			callback(null)
		} catch (err) {
			// Error al verificar el token, el token es inválido o ha expirado
			callback({ 
				error: 'Token inválido',
				success: false
			})
		}
	}
	
	// static async getAllUser () {
	// 	try {
	// 		const users = await firestore.collection('users').get()
	// 		const foundUsers = []
	// 		users.forEach(doc => {
	// 			foundUsers.push({
	// 				nombre: doc.nombre,
	// 				apaterno: doc.aparteno,
	// 				amaterno: doc.amaterno,
	// 				direccion: doc.direccion,
	// 				telefono: doc.telefono,
	// 				email: doc.email,
	// 				...doc.data()
	// 			})
	// 		})
	// 		return foundUsers
	// 	} catch (error) {
	// 		throw error
	// 	}
	// }

	// static async deleteUser (userEmail) {
	// 	try {
	// 		await firestore.collection('users').doc(userEmail).delete()
	// 	} catch (error) {
	// 		throw error
	// 	}
	// }
	
	// static async updateUser (userEmail, userData) {
	// 	try {
	// 		await firestore.collection('users').doc(userEmail).update(userData)
	// 		const userUpdated = await firestore.collection('users').doc(userEmail)
	// 		return {
	// 			userUpdated: userUpdated.data()
	// 		}
	// 	} catch (error) {
	// 		throw error
	// 	}
	// }
}

module.exports = User