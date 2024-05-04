const admin = require('../config/mysql')
const IUser = require('../interfaces/IUser')
const bcrypt = require('bcrypt')

class User extends IUser {
	constructor(nombre, apaterno, amaterno, direccion, telefono, email, password) {
		super()
		this.nombre = nombre
		this.aparteno = apaterno
		this.amaterno = amaterno
		this.direccion = direccion
		this.telefono = telefono
		this.email = email
		this.password = password
	}

	static async createUser(nombre, apaterno, amaterno, direccion, telefono, email, password) {
		try {
			const hash = await bcrypt.hash(password, 10)
			const user = firestore.collection('users').doc(email)

			await user.set({
					nombre,
					apaterno,
					amaterno,
					direccion,
					telefono,
					email, 
					password: hash
			})

			return new User(nombre, apaterno, amaterno, direccion, telefono, email, password)
		} 
		catch (err) {
			console.log('ERROR =>', err)
			throw new Error('Error creating user')
		}
	}

	async verifyPassword (password) {
		return await bcrypt.compare(password, this.password)
	}

	static async findByEmail (email) {
		try {
			const user = firestore.collection('users').doc(email)
			const userDoc = await user.get()

			if (userDoc.exists) {
				const userData = userDoc.data()
				return new User (userData.nombre, userData.apaterno, userData.amaterno, userData.direccion, userData.telefono, userData.email, userData.password)
			}
			return null
		} 
		catch(err) {
			console.log('Error => ', err)
			throw new Error('Error finding user')
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