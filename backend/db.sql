CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE pregunta (
    id_pregunta SERIAL PRIMARY KEY, 
    nom_pregunta VARCHAR(255) NOT NULL
);


CREATE TABLE cuestionario(
    id_cuestionario SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);


CREATE TABLE respuesta (
    id_respuesta SERIAL PRIMARY KEY,
    id_cuestionario INTEGER NOT NULL,
    id_pregunta INTEGER NOT NULL,
    respuesta VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_cuestionario) REFERENCES cuestionario(id_cuestionario) ON DELETE CASCADE,
    FOREIGN KEY (id_pregunta) REFERENCES pregunta(id_pregunta) ON DELETE CASCADE
);


CREATE TABLE resultado (
    id_resultado SERIAL PRIMARY KEY,
    id_cuestionario INTEGER UNIQUE	,
    prediccion VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_cuestionario) REFERENCES cuestionario(id_cuestionario) ON DELETE CASCADE
);