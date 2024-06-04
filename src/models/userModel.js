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

	async updatePassword(password) {
		try {
			const hash = await bcrypt.hash(password, 10)
			const query = "UPDATE usuarios SET usu_password = ? WHERE usu_id = ?"

			await con.query(query, [hash, this.id])

			return true
			
		} catch (error) {
			console.log('Error al actualizar contraseña => ', err)
			return false
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

	static async updateUser (id, nombre, apaterno, amaterno, sexo, email, telefono, carrera, fecha_nac, des, img, ciudad, campus) {
		try {
			const sql = `
				UPDATE usuarios
				SET usu_nombre = ?, usu_apaterno = ?, usu_amaterno = ?, usu_sexo = ?, usu_email = ?,
				usu_telefono = ?, usu_carrera = ?, usu_fecha_nac = ?, usu_des = ?, usu_img = ?,
				usu_ciudad = ?, usu_campus = ?
				WHERE usu_id = ?
			`
			const userDoc = await con.query(sql, [nombre, apaterno, amaterno, sexo, email, telefono, carrera, fecha_nac, des, img, ciudad, campus, id])
	
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
		} catch (error) {
			console.error('Error al actualizar usuario:', error);
		}
	}
}

module.exports = User