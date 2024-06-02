const viajes = require('../models/viajesModel')
const publicar = require('../models/publicarModel')
const reservar = require('../models/reservarModel')

const home = async (req, res) => {
    arrayViajes = await viajes.allViajes()
    
    if(!arrayViajes) {
        return res.status(404).json({
            message: 'No se encontraron viajes',
            success: false
          })
    }

    const id = req.query.id

    arrayViajesPublicados = await viajes.allViajesPublicados(id)
    arrayViajesReservados = await viajes.allViajesReservados(id)

    if(arrayViajesPublicados && arrayViajesReservados){
        return res.status(200).json({
            success: true,
            viajes: arrayViajes,
            viajesPublicados: arrayViajesPublicados,
            viajesReservados: arrayViajesReservados
          })
    }
}

const registrarViaje = async (req, res) => {
    try {
        const {descripcion, inicio, destino, fecha, hora, precio, capacidad, disponible} = req.body
        const { id } = req.body

        const viaje = new viajes(null, descripcion, inicio, destino, fecha, hora, parseInt(precio), parseInt(capacidad), disponible)
        
        await viaje.createViaje()

        await viaje.findViajeParaAsignar()

        const p = await publicar.createPublicar(id, viaje.id)

        if (p) {
            res.status(201).json({
                message: 'VIAJE PUBLICADO SATISFACTORIAMENTE',
                success: true
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

const reservarViaje = async (req, res) => {
    try {
        const { idusuario, idviaje } = req.body

        const reserva = new reservar(idusuario, idviaje)

        resultado = await reserva.createReservar()

        if(resultado) {
            res.status(201).json({
                message: 'VIAJE RESERVADO SATISFACTORIAMENTE',
                success: true
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

module.exports = { home, registrarViaje, reservarViaje }