class IUser {
  static async createUser (nombre, apaterno, amaterno, sexo, email, password, telefono, carrera, fechaNac) {}
  static async findUser (email) {}
  async verifyPassword (password) {}
  static async findUserByViaje (viaje) {}
  // static async getAllUser () {}
  // static async deleteUser (userEmail) {}
  // static async updateUser (userEmail, userData) {}
}

module.exports = IUser