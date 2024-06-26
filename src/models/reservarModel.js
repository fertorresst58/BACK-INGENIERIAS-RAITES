const { query } = require('express')
const con = require('../config/mysql')

class reservar {
    constructor(idusuario, idviaje) {
        this.idusuario = idusuario
        this.idviaje = idviaje
    }

    async printViaje() {
        console.log(this.idusuario,
                    this.idviaje
                    );
    }

    async createReservar(){
        try {
            const query = 'INSERT INTO reservar (res_usu_id, res_via_id) VALUES (?, ?)'

            await con.query(query, [this.idusuario, this.idviaje])

            return true
        } catch (error) {
            console.log('ERROR AL RESERVAR EL VIAJE', error);
        }
    }

    static async findReservar(idusuario, idviaje){
        try {
            const query = 'SELECT * FROM reservar WHERE res_usu_id = ? AND res_via_id = ?'

            let resultado = await con.query(query, [idusuario, idviaje])
            resultado = resultado[0]
            if(resultado) {
                const reserva = new reservar(resultado.res_usu_id,
                                            resultado.res_via_id,
                                            )
                return reserva
            } else {
                return false
            }
        } catch (error) {
            console.log('ERROR AL ENCONTRAR la reservacion =>', error);
        }
    }

}

module.exports = reservar