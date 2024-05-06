class IUser {
  /*
    CREAR UN NUEVO USUARIO
    @param {string} email -> correo del usuario
    @param {string} password -> password del usuario
    @returns {Promise<User>}
    @throws {error} SI HAY UN ERROR EN LA CREACION
  */

  static async createUser (nombre, apaterno, amaterno, sexo, email, password, telefono, carrera, fechaNac) {}
  static async findByEmail (email) {}
  async verifyPassword (password) {}
  // static async getAllUser () {}
  // static async deleteUser (userEmail) {}
  // static async updateUser (userEmail, userData) {}
}

module.exports = IUser