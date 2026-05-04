# Proyecto Meteorológico

## Estado del proyecto

El proyecto está en fase inicial.
Hasta el momento, únicamente se ha desarrollado y configurado el backend.

## Backend

ahora mismo el backend hace lo siguiente:

* Permite consultar la predicción meteorológica por codigo de municipio (el codigo INE).
* Realiza peticiones a la API de AEMET.
* Procesa los datos recibidos.
* Devuelve una respuesta simplificada en formato JSON.

## Notas

* La clave de la API de AEMET se gestiona mediante variables de entorno (.env).
* No se incluye el archivo `.env` en el repositorio por seguridad.