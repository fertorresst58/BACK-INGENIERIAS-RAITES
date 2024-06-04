-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS raitesug;

-- Usar la base de datos
USE raitesug;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    usu_id INT NOT NULL AUTO_INCREMENT,
    usu_nombre VARCHAR(100),
    usu_apaterno VARCHAR(100),
    usu_amaterno VARCHAR(100),
    usu_sexo ENUM('Hombre', 'Mujer', 'Prefiero no decirlo', 'Otro'),
    usu_email VARCHAR(100),
    usu_password VARCHAR(100),
    usu_telefono VARCHAR(20),
    usu_carrera VARCHAR(150),
    usu_fecha_nac DATE,
    usu_des TINYTEXT,
    usu_img VARCHAR(30),
    usu_ciudad VARCHAR(30),
    usu_campus VARCHAR(30),
    PRIMARY KEY (usu_id),
    UNIQUE (usu_email)
);

-- Tabla de viajes
CREATE TABLE IF NOT EXISTS viajes (
    via_id INT NOT NULL AUTO_INCREMENT,
    via_descripcion VARCHAR(500),
    via_inicio VARCHAR(100) NOT NULL, 
    via_destino VARCHAR(100) NOT NULL,
    via_fecha DATE NOT NULL,
    via_hora TIME NOT NULL,
    via_precio DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (via_id)
);

-- Tabla de reservas
CREATE TABLE IF NOT EXISTS reservar (
    res_usu_id INT NOT NULL,
    res_via_id INT NOT NULL,
    PRIMARY KEY (res_usu_id, res_via_id),
    CONSTRAINT fk_usuario_reservar
        FOREIGN KEY (res_usu_id) 
        REFERENCES usuarios(usu_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_viaje_reservar
        FOREIGN KEY (res_via_id) 
        REFERENCES viajes(via_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS publicar (
    pub_usu_id INT NOT NULL,
    pub_via_id INT NOT NULL,
    PRIMARY KEY (pub_usu_id, pub_via_id),
    CONSTRAINT fk_usuario_publicar
        FOREIGN KEY (pub_usu_id) 
        REFERENCES usuarios(usu_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_viaje_publicar
        FOREIGN KEY (pub_via_id) 
        REFERENCES viajes(via_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS resenas (
	res_id INT NOT NULL AUTO_INCREMENT,
	res_via_id INT NOT NULL,
    res_usu_id INT NOT NULL,
    res_puntuacion INT NOT NULL,
    res_comentario TEXT,
    res_fecha DATE,
    PRIMARY KEY(res_id),
		CONSTRAINT fk_usuarios_resenas
			FOREIGN KEY (res_usu_id)
            REFERENCES usuarios(usu_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
		CONSTRAINT fk_viajes_resenas
			FOREIGN KEY (res_via_id)
            REFERENCES viajes(via_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

INSERT INTO usuarios (usu_nombre, usu_sexo, usu_email, usu_password, usu_telefono, usu_carrera) VALUES
('Juan Perez', 'Hombre', 'juan@example.com', 'password1', '1234567890', 'Ingeniería Informática'),
('María García', 'Mujer', 'maria@example.com', 'password2', '0987654321', 'Medicina'),
('Alejandro Lopez', 'Hombre', 'alejandro@example.com', 'password3', '5551234567', 'Derecho'),
('Ana Martínez', 'Mujer', 'ana@example.com', 'password4', '777888999', 'Administración de Empresas'),
('Pedro Rodríguez', 'Hombre', 'pedro@example.com', 'password5', '3216549870', 'Arquitectura'),
('Sofía Hernández', 'Mujer', 'sofia@example.com', 'password6', '666999888', 'Psicología'),
('Diego Gómez', 'Hombre', 'diego@example.com', 'password7', '111222333', 'Biología'),
('Laura Díaz', 'Mujer', 'laura@example.com', 'password8', '777000111', 'Química'),
('Carlos Ruiz', 'Hombre', 'carlos@example.com', 'password9', '444555666', 'Economía'),
('Luisa Sánchez', 'Mujer', 'luisa@example.com', 'password10', '222333444', 'Historia'),
('admin', 'Hombre', 'admin@ugto.mx', '$2b$10$N8Bv5Vd0Uqv6ljQ4k5zO6u3yEK1IQnibGwjI/a67EWnCf6tqLcGxq', '1111111111', 'Historia');

INSERT INTO viajes (via_descripcion, via_inicio, via_destino, via_fecha, via_hora, via_precio) VALUES
('Viaje de negocios', 'Ciudad A', 'Ciudad B', '2024-05-01', '08:00:00', 150.00),
('Vacaciones en la playa', 'Ciudad C', 'Ciudad D', '2024-06-10', '10:30:00', 300.00),
('Excursión de montaña', 'Ciudad E', 'Ciudad F', '2024-07-15', '09:00:00', 200.00),
('Tour cultural', 'Ciudad G', 'Ciudad H', '2024-08-20', '11:00:00', 100.00),
('Viaje de aventura', 'Ciudad I', 'Ciudad J', '2024-09-25', '12:30:00', 250.00),
('Escapada de fin de semana', 'Ciudad K', 'Ciudad L', '2024-10-30', '14:00:00', 180.00),
('Tour gastronómico', 'Ciudad M', 'Ciudad N', '2024-11-05', '16:00:00', 120.00),
('Viaje de relajación', 'Ciudad O', 'Ciudad P', '2024-12-10', '18:30:00', 350.00),
('Excursión cultural', 'Ciudad Q', 'Ciudad R', '2025-01-15', '20:00:00', 180.00),
('Vacaciones de invierno', 'Ciudad S', 'Ciudad T', '2025-02-20', '22:00:00', 400.00);

INSERT INTO reservar (res_usu_id, res_via_id) VALUES
(1, 1), 
(4, 2),  
(8, 3), 
(7, 4),  
(9, 5),  
(1, 6),  
(11, 7),  
(11, 8),  
(11, 9), 
(11, 10); 

INSERT INTO publicar (pub_usu_id, pub_via_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(1, 5),
(2, 6),
(3, 7),
(4, 8),
(1, 9),
(2, 10);

INSERT INTO resenas (res_via_id, res_usu_id, res_puntuacion, res_comentario, res_fecha) 
VALUES 
(1, 2, 4, 'Buen servicio, lo recomendaría.', '2024-04-25'),
(1, 3, 3, 'Regular, podría mejorar.', '2024-04-24'),
(2, 1, 5, 'Excelente trato, muy profesional.', '2024-04-23'),
(2, 3, 2, 'No quedé satisfecho con el servicio.', '2024-04-22'),
(3, 1, 4, 'Buen producto, entrega rápida.', '2024-04-21'),
(3, 2, 5, 'Muy contento con la calidad del producto.', '2024-04-20'),
(4, 3, 3, 'El servicio fue aceptable.', '2024-04-19'),
(4, 1, 4, 'Me gustó el trato recibido.', '2024-04-18'),
(5, 2, 2, 'No cumplió con mis expectativas.', '2024-04-17'),
(5, 1, 3, 'Podría mejorar la atención al cliente.', '2024-04-16');

INSERT INTO viajes (via_descripcion, via_inicio, via_destino, via_fecha, via_hora, via_precio)
VALUES ('Desc1', 'Ini1' ,'Des1', '2023-06-09', '10:00:00', '166.66'),
('Desc2', 'Ini2' ,'Des2', '2024-05-28', '05:00:00', '266.66'),
('Desc3', 'Ini3' ,'Des3', '2024-02-19', '14:00:00', '366.66');

INSERT INTO reservar (res_usu_id, res_via_id)
VALUES (11, 11), (11, 12), (11, 13);

DELETE FROM resenas WHERE res_usu_id = 11;