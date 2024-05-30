const { query } = require('express')
const con = require('../config/mysql')

class publicar {
    constructor(idusuario, idviaje) {
        this.idusuario = idusuario
        this.idviaje = idviaje
    }

    async printViaje() {
        console.log(this.idusuario,
                    this.idviaje
                    );
    }

    static async createPublicar(idusuario, idviaje){
        try {
            const query = 'INSERT INTO publicar (pub_usu_id, pub_via_id) VALUES (?, ?)'

            await con.query(query, [idusuario, idviaje])

            return new publicar(idusuario, idviaje)
        } catch (error) {
            console.log('ERROR AL PUBLICAR LOS VIAJES', error);
        }
    }
}

module.exports = publicar