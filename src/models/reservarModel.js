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

}

module.exports = reservar