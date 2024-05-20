const viajes = require('../models/viajesModel')

const home = async (req, res) => {
    arrayViajes = await viajes.allViajes()
    
    if(!arrayViajes) {
        return res.status(404).json({
            message: 'No se encontraron viajes',
            success: false
          })
    }

    arrayViajesPublicados = await viajes.allViajesPublicados(10)
    arrayViajesReservados = await viajes.allViajesReservados(10)

    if(arrayViajesPublicados && arrayViajesReservados){
        return res.status(200).json({
            success: true,
            viajes: arrayViajes,
            viajesPublicados: arrayViajesPublicados,
            viajesReservados: arrayViajesReservados
          })
    }
    
}

module.exports = { home }