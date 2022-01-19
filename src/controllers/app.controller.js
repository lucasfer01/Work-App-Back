// Models
const { Job } = require('../database/db');

// Oficios
const oficios = [
    {
        "job_name": "Abogado",
        "job_description": "",
        "job_photo": "https://i.imgur.com/TmZ1GCl.png"
    },
    {
        "job_name": "Administrador",
        "job_description": "",
        "job_photo": "https://i.imgur.com/NFU4P1e.png"
    },
    {
        "job_name": "Agricultor",
        "job_description": "",
        "job_photo": "https://i.imgur.com/Zk7HbL7.png"
    },
    {
        "job_name": "Albañil",
        "job_description": "",
        "job_photo": "https://i.imgur.com/epgszZi.png"
    },
    {
        "job_name": "Animador",
        "job_description": "",
        "job_photo": "https://i.imgur.com/rn4D9mF.png"
    },
    {
        "job_name": "Antropólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/jwaLWHi.png"
    },
    {
        "job_name": "Archivólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/5YvYjE2.png"
    },
    {
        "job_name": "Arqueólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/vv7hjm5.png"
    },
    {
        "job_name": "Arquitecto",
        "job_description": "",
        "job_photo": "https://i.imgur.com/Z33il4E.png"
    },
    {
        "job_name": "Artesano",
        "job_description": "",
        "job_photo": "https://i.imgur.com/m0xrdb8.png"
    },
    {
        "job_name": "Aseador",
        "job_description": "",
        "job_photo": "https://i.imgur.com/Xvpw8oV.png"
    },
    {
        "job_name": "Barbero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/XBmWqP1.png"
    },
    {
        "job_name": "Barrendero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/gIomLt3.png"
    },
    {
        "job_name": "Bibliotecólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/TPSiuaV.png"
    },
    {
        "job_name": "Biólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/5FNAL5O.png"
    },
    {
        "job_name": "Botánico",
        "job_description": "",
        "job_photo": "https://i.imgur.com/jU1Vd19.png"
    },
    {
        "job_name": "Cajero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/gsZ8MDu.png"
    },
    {
        "job_name": "Carnicero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/y9BfbJf.png"
    },
    {
        "job_name": "Carpintero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/ZX04Imz.png"
    },
    {
        "job_name": "Celador",
        "job_description": "",
        "job_photo": "https://i.imgur.com/58C2Tql.png"
    },
    {
        "job_name": "Cerrajero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/ZSCsnZl.png"
    },
    {
        "job_name": "Chofer",
        "job_description": "",
        "job_photo": "https://i.imgur.com/t0NCzXX.png"
    },
    {
        "job_name": "Cocinero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/UjTOh5y.jpg"
    },
    {
        "job_name": "Conductor",
        "job_description": "",
        "job_photo": "https://i.imgur.com/t0NCzXX.png"
    },
    {
        "job_name": "Contador",
        "job_description": "",
        "job_photo": "https://i.imgur.com/PBZMa60.png"
    },
    {
        "job_name": "Diseñador",
        "job_description": "",
        "job_photo": "https://i.imgur.com/gB9BFOf.png"
    },
    {
        "job_name": "Ecólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/9e17Z4F.jpg"
    },
    {
        "job_name": "Economista",
        "job_description": "",
        "job_photo": "https://i.imgur.com/uFOHrfv.png"
    },
    {
        "job_name": "Electricista",
        "job_description": "",
        "job_photo": "https://i.imgur.com/OAD9usp.png"
    },
    {
        "job_name": "Enfermero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/LDBT9Qd.png"
    },
    {
        "job_name": "Escritor",
        "job_description": "",
        "job_photo": "https://i.imgur.com/0PHbDOW.png"
    },
    {
        "job_name": "Escultor",
        "job_description": "",
        "job_photo": "https://i.imgur.com/O1Y4vQf.png"
    },
    {
        "job_name": "Exterminador",
        "job_description": "",
        "job_photo": "https://i.imgur.com/Et7ZNyL.png"
    },
    {
        "job_name": "Farmacólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/gz3UtiH.png"
    },
    {
        "job_name": "Filólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/xG8nu1R.png"
    },
    {
        "job_name": "Filósofo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/BLbrTr0.png"
    },
    {
        "job_name": "Físico",
        "job_description": "",
        "job_photo": "https://i.imgur.com/EkUtwDK.png"
    },
    {
        "job_name": "Fontanero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/7qZFeA3.png"
    },
    {
        "job_name": "Frutero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/9mS2m1J.png"
    },
    {
        "job_name": "Geógrafo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/Y4czKfH.png"
    },
    {
        "job_name": "Historiador",
        "job_description": "",
        "job_photo": "https://i.imgur.com/7kUwj8V.png"
    },
    {
        "job_name": "Ingeniero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/megG244.png"
    },
    {
        "job_name": "Lavandero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/cLikS2Z.png"
    },
    {
        "job_name": "Linguista",
        "job_description": "",
        "job_photo": "https://i.imgur.com/MoxsS8Y.png"
    },
    {
        "job_name": "Locutor",
        "job_description": "",
        "job_photo": "https://i.imgur.com/xeG9HM0.png"
    },
    {
        "job_name": "Matemático",
        "job_description": "",
        "job_photo": "https://i.imgur.com/vBunmVi.png"
    },
    {
        "job_name": "Mecánico",
        "job_description": "",
        "job_photo": "https://i.imgur.com/jOp7ClJ.png"
    },
    {
        "job_name": "Médico",
        "job_description": "",
        "job_photo": "https://i.imgur.com/nbFR7vG.png"
    },
    {
        "job_name": "Músico",
        "job_description": "",
        "job_photo": "https://i.imgur.com/S13GgQP.png"
    },
    {
        "job_name": "Obrero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/sV8GRlg.png"
    },
    {
        "job_name": "Odontólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/sWZsLNu.png"
    },
    {
        "job_name": "Panadero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/HLaOETe.png"
    },
    {
        "job_name": "Paramédico",
        "job_description": "",
        "job_photo": "https://i.imgur.com/PxaVDJg.png"
    },
    {
        "job_name": "Peletero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/eZpBZCW.png"
    },
    {
        "job_name": "Periodista",
        "job_description": "",
        "job_photo": "https://i.imgur.com/fY82d2j.png"
    },
    {
        "job_name": "Pintor",
        "job_description": "",
        "job_photo": "https://i.imgur.com/IF6bJo4.png"
    },
    {
        "job_name": "Plomero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/7qZFeA3.png"
    },
    {
        "job_name": "Podador",
        "job_description": "",
        "job_photo": "https://i.imgur.com/76tkfUS.png"
    },
    {
        "job_name": "Politólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/nqCi2cF.png"
    },
    {
        "job_name": "Profesor",
        "job_description": "",
        "job_photo": "https://i.imgur.com/gTVwvG1.png"
    },
    {
        "job_name": "Programador",
        "job_description": "",
        "job_photo": "https://i.imgur.com/EQ5q3He.png"
    },
    {
        "job_name": "Psicoanalista",
        "job_description": "",
        "job_photo": "https://i.imgur.com/BKuo9Pi.png"
    },
    {
        "job_name": "Psicólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/BKuo9Pi.png"
    },
    {
        "job_name": "Químico",
        "job_description": "",
        "job_photo": "https://i.imgur.com/bSr6Jy6.png"
    },
    {
        "job_name": "Radiólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/F0lAodP.png"
    },
    {
        "job_name": "Sastre",
        "job_description": "",
        "job_photo": "https://i.imgur.com/6wV1ne6.png"
    },
    {
        "job_name": "Secretaria",
        "job_description": "",
        "job_photo": "https://i.imgur.com/frsBcbz.png"
    },
    {
        "job_name": "Sociólogo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/rRqaxOU.png"
    },
    {
        "job_name": "Soldador",
        "job_description": "",
        "job_photo": "https://i.imgur.com/Gev0FLK.png"
    },
    {
        "job_name": "Técnico de sonido",
        "job_description": "",
        "job_photo": "https://i.imgur.com/JheDTkR.png"
    },
    {
        "job_name": "Técnico en turismo",
        "job_description": "",
        "job_photo": "https://i.imgur.com/qgla8w2.png"
    },
    {
        "job_name": "Tornero",
        "job_description": "",
        "job_photo": "https://i.imgur.com/zB1TpIl.png"
    },
    {
        "job_name": "Traductor",
        "job_description": "",
        "job_photo": "https://i.imgur.com/DqQKxDM.png"
    },
    {
        "job_name": "Vigilante",
        "job_description": "",
        "job_photo": "https://i.imgur.com/I8c60qf.png"
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