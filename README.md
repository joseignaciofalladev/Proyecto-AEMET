# Proyecto Meteorológico

Actualización 13/5/2026

## Backend

ahora mismo el backend hace lo siguiente:

* Permite consultar la predicción meteorológica por codigo de municipio (el codigo INE).
* Realiza peticiones a la API de AEMET.
* Procesa los datos recibidos.
* Devuelve una respuesta simplificada en formato JSON.
* Se obtiene las estadisticas de los siguientes dias del municipio buscado (último añadido)

## Frontend

ahora mismo el frontend hace lo siguiente:

* Buscar los municipios con un campo de texto. Al poner dos letras, se filtrará por los nombres parecidos que empieze o contenga esas dos letras juntas.
* Tarjetas del tiempo. Se meustra el clima del municipio buscado y tambien de los siguientes dias en pequeñas tarjetas.
* Historial de busquedas añadido. Se mostrará lo que se ha buscado, incluso se podrá clickar sobre ellos para mostrar las estadisticas del tiempo de ese municipio, volviendo a la primera fila del historial. tambien he añadido un boton de borrar historial.
* Modo oscuro. Lo he llamado como modo dia y noche, aun es basico, pero funciona lo de cambiar los colores a los textos y fondos con una pequeña transicion que he añadido porque me molesta el cambio instantaneo entre luz y oscuridad.
