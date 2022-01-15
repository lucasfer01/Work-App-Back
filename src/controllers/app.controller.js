// Models
const { Job } = require('../database/db');

// Oficios
const oficios = [
    {
        "job_name": "Abogado",
        "job_description": ""
    },
    {
        "job_name": "Administrador",
        "job_description": ""
    },
    {
        "job_name": "Agricultor",
        "job_description": ""
    },
    {
        "job_name": "Albañil",
        "job_description": ""
    },
    {
        "job_name": "Animador",
        "job_description": ""
    },
    {
        "job_name": "Antropologo",
        "job_description": ""
    },
    {
        "job_name": "Archivólogo",
        "job_description": ""
    },
    {
        "job_name": "Arqueólogo",
        "job_description": ""
    },
    {
        "job_name": "Arquitecto",
        "job_description": ""
    },
    {
        "job_name": "Artesano",
        "job_description": ""
    },
    {
        "job_name": "Aseador",
        "job_description": ""
    },
    {
        "job_name": "Barbero",
        "job_description": ""
    },
    {
        "job_name": "Barrendero",
        "job_description": ""
    },
    {
        "job_name": "Bibliotecólogo",
        "job_description": ""
    },
    {
        "job_name": "Biologo",
        "job_description": ""
    },
    {
        "job_name": "Botanico",
        "job_description": ""
    },
    {
        "job_name": "Cajero",
        "job_description": ""
    },
    {
        "job_name": "Carnicero",
        "job_description": ""
    },
    {
        "job_name": "Carpintero",
        "job_description": ""
    },
    {
        "job_name": "Celador",
        "job_description": ""
    },
    {
        "job_name": "Cerrajero",
        "job_description": ""
    },
    {
        "job_name": "Chofer",
        "job_description": ""
    },
    {
        "job_name": "Cocinero",
        "job_description": ""
    },
    {
        "job_name": "Conductor",
        "job_description": ""
    },
    {
        "job_name": "Contador",
        "job_description": ""
    },
    {
        "job_name": "Diseñador",
        "job_description": ""
    },
    {
        "job_name": "Ecologo",
        "job_description": ""
    },
    {
        "job_name": "Economista",
        "job_description": ""
    },
    {
        "job_name": "Electicista",
        "job_description": ""
    },
    {
        "job_name": "Enfermero",
        "job_description": ""
    },
    {
        "job_name": "Escritor",
        "job_description": ""
    },
    {
        "job_name": "Escultor",
        "job_description": ""
    },
    {
        "job_name": "Exteminador",
        "job_description": ""
    },
    {
        "job_name": "Farmacologo",
        "job_description": ""
    },
    {
        "job_name": "Filologo",
        "job_description": ""
    },
    {
        "job_name": "Filosofo",
        "job_description": ""
    },
    {
        "job_name": "Fisico",
        "job_description": ""
    },
    {
        "job_name": "Fontanero",
        "job_description": ""
    },
    {
        "job_name": "Frutero",
        "job_description": ""
    },
    {
        "job_name": "Geógrafo",
        "job_description": ""
    },
    {
        "job_name": "Historiador",
        "job_description": ""
    },
    {
        "job_name": "Ingeniero",
        "job_description": ""
    },
    {
        "job_name": "Lavandero",
        "job_description": ""
    },
    {
        "job_name": "Linguista",
        "job_description": ""
    },
    {
        "job_name": "Locutor",
        "job_description": ""
    },
    {
        "job_name": "Matematico",
        "job_description": ""
    },
    {
        "job_name": "Mecanico",
        "job_description": ""
    },
    {
        "job_name": "Medico",
        "job_description": ""
    },
    {
        "job_name": "Musico",
        "job_description": ""
    },
    {
        "job_name": "Obrero",
        "job_description": ""
    },
    {
        "job_name": "Odontologo",
        "job_description": ""
    },
    {
        "job_name": "Panadero",
        "job_description": ""
    },
    {
        "job_name": "Paramedico",
        "job_description": ""
    },
    {
        "job_name": "Peletero",
        "job_description": ""
    },
    {
        "job_name": "Periodista",
        "job_description": ""
    },
    {
        "job_name": "Pintor",
        "job_description": ""
    },
    {
        "job_name": "Plomero",
        "job_description": ""
    },
    {
        "job_name": "Podador",
        "job_description": ""
    },
    {
        "job_name": "Politologo",
        "job_description": ""
    },
    {
        "job_name": "Profesor",
        "job_description": ""
    },
    {
        "job_name": "Psicoanalista",
        "job_description": ""
    },
    {
        "job_name": "Psicologo",
        "job_description": ""
    },
    {
        "job_name": "Quimico",
        "job_description": ""
    },
    {
        "job_name": "Radiologo",
        "job_description": ""
    },
    {
        "job_name": "Sastre",
        "job_description": ""
    },
    {
        "job_name": "Secretaria",
        "job_description": ""
    },
    {
        "job_name": "Sociologo",
        "job_description": ""
    },
    {
        "job_name": "Soldador",
        "job_description": ""
    },
    {
        "job_name": "Técnico de sonido",
        "job_description": ""
    },
    {
        "job_name": "Técnico en turismo",
        "job_description": ""
    },
    {
        "job_name": "Tornero",
        "job_description": ""
    },
    {
        "job_name": "Traductor",
        "job_description": ""
    },
    {
        "job_name": "Vigilante",
        "job_description": ""
    }
]

// Cargar oficio a la base de datos
const cargarOficios = () => {
    // Corroboramos que no hay registros
    Job.findAll()
        .then(jobs => {
            if (!jobs.length) {
                // Mapeamos y agregamos creamos el registro
                const promisesOficios = oficios.map(job => Job.create({ ...job }));
                // resolvemos la promesas
                Promise.all(promisesOficios)
                    .then(response => console.log('Oficios cargados correctamente'))
            } else {
                console.log('La base de datos ya tiene oficios cargados');
            }
        })
        .catch(error => console.log(error));
}

module.exports = {
    cargarOficios
}