const { query } = require('express')
const con = require('../config/mysql')

class viajes {
    constructor(id, descripcion, inicio, destino, fecha, hora, precio, capacidad, disponible) {
        this.id = id
        this.descripcion = descripcion
        this.inicio = inicio
        this.destino = destino
        this.fecha = fecha
        this.hora = hora
        this.precio = precio
        this.capacidad = capacidad
        this.disponible = disponible
    }

    async printViaje() {
        console.log(this.id,
                    this.descripcion,
                    this.inicio,
                    this.destino,
                    this.fecha,
                    this.hora,
                    this.precio,
                    this.capacidad,
                    this.disponible
                    );
    }

    async createViaje() {
        try {
            const query = 'INSERT INTO viajes (via_descripcion, via_inicio, via_destino, via_fecha, via_hora, via_precio, via_capacidad, via_disponible) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?)'

            await con.query(query, [
                this.descripcion,
                this.inicio,
                this.destino,
                this.fecha,
                this.hora,
                this.precio,
                this.capacidad,
                this.disponible
            ])
        } catch (error) {
            console.log('ERROR =>', error)
        }
    }
    async updateViaje() {
        try {
            const query = 'INSERT INTO viajes (via_descripcion, via_inicio, via_destino, via_fecha, via_hora, via_precio, via_capacidad, via_disponible) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?)'

            await con.query(query, [
                this.descripcion,
                this.inicio,
                this.destino,
                this.fecha,
                this.hora,
                this.precio,
                this.capacidad,
                this.disponible
            ])
        } catch (error) {
            console.log('ERROR =>', error)
        }
    }

    async findViajeParaAsignar(){
        try {
            const query = 'SELECT via_id FROM viajes WHERE via_descripcion = ? AND via_fecha = ? AND via_hora = ?'

            const resultado = await con.query(query, [this.descripcion, this.fecha, this.hora])
            const { via_id } = resultado[0]
            this.id = via_id

        } catch (error) {
            console.log('ERROR AL ENCONTRAR EL VIAJE =>', error);
        }
    }

    static async findViajePorId(id){
        try {
            const query = 'SELECT * FROM viajes WHERE via_id = ? LIMIT 1'

            let resultado = await con.query(query, [id])
            resultado = resultado[0]
            
            const viaje = new viajes(resultado.via_id,
                                    resultado.via_descripcion,
                                    resultado.via_inicio,
                                    resultado.via_destino,
                                    resultado.via_fecha,
                                    resultado.via_hora,
                                    resultado.via_precio,
                                    resultado.via_capacidad,
                                    resultado.via_disponible
                                    )

            return viaje
        } catch (error) {
            console.log('ERROR AL ENCONTRAR EL VIAJE =>', error);
        }
    }

    async actualizarCapacidad(reservado){
        try {
            const query = "UPDATE viajes SET via_capacidad = ? WHERE via_id = ?"
            
            await con.query(query, [reservado, this.id])

            return true

        } catch (error) {
            console.log('ERROR AL ACTUALIZAR EL VIAJE =>', error);
            return false
        }
    }

    static async allViajes() {
        try {
            const query = 'SELECT * FROM viajes'

            let arrayViajes = Array()

            const allViajes = await con.query(query)
            
            allViajes.forEach(viaje => {
                let aux = new viajes(viaje.via_id,
                                    viaje.via_descripcion,
                                    viaje.via_inicio,
                                    viaje.via_destino,
                                    viaje.via_fecha.toISOString().slice(0, 10),
                                    viaje.via_hora,
                                    viaje.via_precio,
                                    viaje.via_capacidad,
                                    viaje.via_disponible
                                    )
                arrayViajes.push(aux)
            })
            return arrayViajes
        } catch (error) {
            console.log('ERROR AL ENCONTRAR LOS VIAJES', error);
        }
    }

    static async allViajesPublicados(usu_id) {
        try {
            const query = 'SELECT viajes.* FROM usuarios INNER JOIN publicar ON usu_id = pub_usu_id INNER JOIN viajes ON pub_via_id = via_id WHERE usu_id = ?'

            const allViajesReservados = await con.query(query, [usu_id])

            let arrayViajesReservados = Array()

            allViajesReservados.forEach(viaje => {
                let aux = new viajes(viaje.via_id,
                                    viaje.via_descripcion,
                                    viaje.via_inicio,
                                    viaje.via_destino,
                                    viaje.via_fecha.toISOString().slice(0, 10),
                                    viaje.via_hora,
                                    viaje.via_precio,
                                    viaje.via_capacidad,
                                    viaje.via_disponible
                                    )
                arrayViajesReservados.push(aux)
            })
            return arrayViajesReservados
        } catch (error) {
            console.log('ERROR AL ENCONTRAR LOS VIAJES', error);
        }
    }

    static async allViajesReservados(usu_id) {
        try {
            const query = 'SELECT viajes.* FROM usuarios INNER JOIN reservar ON usu_id = res_usu_id INNER JOIN viajes ON res_via_id = via_id WHERE usu_id = ?'

            const allViajesPublicados = await con.query(query, [usu_id])
            let arrayViajesPublicadoss = Array()

            allViajesPublicados.forEach(viaje => {
                let aux = new viajes(viaje.via_id,
                                    viaje.via_descripcion,
                                    viaje.via_inicio,
                                    viaje.via_destino,
                                    viaje.via_fecha.toISOString().slice(0, 10),
                                    viaje.via_hora,
                                    viaje.via_precio,
                                    viaje.via_capacidad,
                                    viaje.via_disponible
                                    )
                arrayViajesPublicadoss.push(aux)
            })
            return arrayViajesPublicadoss
        } catch (error) {
            console.log('ERROR AL ENCONTRAR LOS VIAJES', error);
        }
    }
}

module.exports = viajes