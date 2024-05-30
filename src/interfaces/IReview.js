class IReview {
    static async createReview (viaje, usuario, puntuacion, comentario, fecha) {}
    static async findReview (viaje, usuario) {}
    static async findAllReviews (viaje) {}
  }
  
  module.exports = IReview