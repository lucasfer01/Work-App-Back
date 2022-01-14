# Work App Backend

## Pasos a seguir

Clonar el repositorio

```bash
  git clone https://github.com/lucasfer01/Work-App-Back.git
```

Instalar dependencias

```bash
  Dentro del repositorio abrir consola y escribir "npm install"
```

Crear archivo `.env` y crear las variables de entorno

```bash
  PORT=3000
  POSTGRES_HOST=localhost
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD= aca va tu contraseña
  POSTGRES_DB_NAME=work_app

  PUBLIC_VAPID_KEY=BIGOGlUA89Jmop6cxKKXBw26LSl679plMCPJ6oDykA5Ik6KlM90sBZcxy80tkPq5HIYd-55vc-M-3Xs1my8SgX4
  PRIVATE_VAPID_KEY=cAIh586rrv7DJm7IMefhlkUMoU4WhZQKW5yUzcUllrg
```

Levantar el servidor

```bash
  En la misma consola escribir "npm start"
```

</br>

## Endpoints

### Usuarios
````
RUTA: http://localhost:3000/user

SUBRUTAS:
  Get:
    '/' (Mostrar todo los usuarios)

    '/:userId' (Buscar usuario por id y mostrarlo)

  Post:
    '/' (Crear usuario)

  Put:
    '/:userId' (Modificar usuario)

  Delete:
    '/:userId' (Eliminar usuario) 


  JSON:
    {
      "usr_username": "Lucasfer01",
      "usr_email": "mail@gmail.com",
      "usr_id": "a2",
      "usr_photo": ["Link 1", "Link 2", "Link 3"],
      "usr_role": "user",
      "usr_description": "Descripcion del perfil",
      "usr_location": {latitud, longitud},
      "usr_score": 5
    }
 
````

### Oficios

````
RUTA: http://localhost:3000/job

SUBRUTAS:
  Get:
    '/' (Mostrar todos los oficios)

    '/:jobId' (Buscar oficio por id y mostrarlo)

    '/job?jobName=NombreDelOficio'

  Post:
    '/' (Crear oficio)

  Put:
    '/:jobId' (Actualizar oficio)

  Delete:
    '/:jobId' (Eliminar oficio)


  JSON:
    {
      "job_name": "fullstack developer",
      "job_description": "Descripcion de fullstack developer"
    }
````

### Conectar oficio con usuario

````
RUTA: http://localhost:3000/user-job

SUBRUTAS:
  Post:
    '/:userId/:jobId' (Conecta el usuario del id con el trabajo del id)
````

### Posteos

````
RUTA: http://localhost:3000/post

SUBRUTAS:
  Get:
    '/' (Mostrar todos los oficios)

    '/:postId' (Buscar post por id y mostrarlo)

  Post:
    '/' (Crear post)

  Put:
    '/:postId' (Actualizar el post)

  Delete:
    '/:postId' (Eliminar post)


  JSON:
    {
      "post_title": "FullStack Developer",
      "post_description": "Frontend and Backend Developer",
      "post_shortdescription": "Descripcion corta",
      "post_photo": ["Link 1", "Link 2"],
      "post_priority": "Urgente",
      "post_fee": 140,
      "usr_id": "id de usuario que hace el post"
    }
````

### Relacion post con oficio

````
RUTA: 'http://localhost:3000'

SUBRUTAS:
  POST:
    '/:workerPostId/:jobId' (Relacionar post con oficio)
````

### Mercadopago

````
POST: http://localhost:3000/checkout

ENVIAR -->   JSON: {
                    "title": "Dummy Title",   <-- OBLIGATORIO
                    "description": "Dummy description",    <-- OBLIGATORIO
                    "picture_url": "http://www.myapp.com/myimage.jpg",
                    "category_id": "cat123",
                    "quantity": 1,    <-- OBLIGATORIO
                    "unit_price": 10    <-- OBLIGATORIO
                  }

<-- DEVUELVE
    RESULTADO: Devuelve un objeto con informacion de la operacion, pero lo que importa es el campo "init_point", el cual es un link que lleva a la pagina para completar el pago


Credencial de prueba

Numero de tarjeta: 5031 7557 3453 0604

Vencimeinto: 11/25

codigo de seguridad: 123

Nombre: Cualquiera (Oponer OTHE para que el pago de rechazado);

los demas datos se pueden inventar, tales como dni y mail
````


### WorkerPost

````
RUTA: http://localhost:3000/workerPost

SUBRUTAS:
  POST: 
    '/' (Crear workerPost)

  GET: 
    '/user/:userId' (Trae todos los workerpost del usuario)

    '/:workerpostId' (Trae workerpost por id) 

  PUT:
    '/:workerpostId' (Actualizar datos de workerpost)

  DELETE:
    '/:workerpostId' ("Elimina" el workerpost)



  JSON: {
          "wp_title": "Titulo",
          "wp_description": "Description",
          "wp_photo": ["link1", "link2"],
          "usr_id": "id de usuario que hizo el post"
        }

````

### Relacionar workerpost con oficio

````
RUTA: http://localhost:3000/workerpost-job/:workerpostId/:jobId

### Notificaciones push

````
ENVIAR NOTIFICACIÓN: 
POST: http://localhost:3000/new-message
BODY: {
  title: "Something",
  message: "Something else",
}


````