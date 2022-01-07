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
````

### Oficios

````
RUTA: http://localhost:3000/job

SUBRUTAS:
  Get:
    '/' (Mostrar todos los oficios)

    '/:jobId' (Buscar oficio por id y mostrarlo)

  Post:
    '/' (Crear oficio)

  Put:
    '/:jobId' (Actualizar oficio)

  Delete:
    '/:jobId' (Eliminar oficio)
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
````