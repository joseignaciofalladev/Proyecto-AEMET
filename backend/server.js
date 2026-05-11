// Importar dependencias
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permitir peticiones desde cualquier origen
app.use(express.json()); // Parsear JSON en el body de las peticiones

// RUTA PRINCIPAL (INFO DE LA API)
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Meteorológica',
    endpoints: {
      '/api/tiempo/:codigo': 'Predicción meteorológica por municipio (código INE)'
    }
  });
});

// ENDPOINT PRINCIPAL
app.get('/api/tiempo/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;

    // Validacion: el código debe ser exactamente 5 numeros
    if (!codigo || !/^\d{5}$/.test(codigo)) {
      return res.status(400).json({
        success: false,
        error: 'Código de municipio no válido'
      });
    }

    // PETICION 1 A AEMET
    // AEMET no devuelve directamente los datos, sino una URL temporal
    const response = await fetch(
      `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${codigo}?api_key=${process.env.AEMET_API_KEY}`
    );

    // Si AEMET falla, se devuelve el error controlado
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: 'Error en la API de AEMET'
      });
    }

    const data = await response.json();

    // PETICION 2 A AEMET
    // Aqui si se obtiene los datos reales usando la URL anterior
    const datosResponse = await fetch(data.datos);
    if (!datosResponse.ok) {throw new Error('Error al obtener datos finales');}
    const prediccion = await datosResponse.json();

    // Validacion: si no hay datos, devolvemos error
    if (!prediccion || !prediccion.length) {
      return res.status(404).json({
        success: false,
        error: 'No hay datos disponibles'
      });
    }

    // PROCESAMIENTO DE DATOS
    // Se extrae solo la informacion que interesa
    const datos = prediccion[0];
    // ahora se obtiene las estadisticas de los siguientes dias del municipio buscado
    const dias = datos.prediccion.dia.map((dia) => ({
      fecha: dia.fecha,
      temperatura: {
        max: dia.temperatura.maxima,
        min: dia.temperatura.minima
      },
      estadoCielo:
        dia.estadoCielo.find(e => e.descripcion)?.descripcion || "No disponible",
      lluvia:
        dia.probPrecipitacion.find(p => p.value !== "")?.value || 0,
      viento:
        dia.viento.find(v => v.velocidad)?.velocidad || 0
    }));

    res.json({
      success: true,
      data: {
        municipio: datos.nombre,
        provincia: datos.provincia,
        dias
      }
    });

  } catch (error) {
    console.error(error);

    // Error general del servidor
    res.status(500).json({
      success: false,
      error: 'Error obteniendo datos meteorológicos'
    });
  }
});

// Ruta para manejar endpoints no encontrados
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Documentación disponible en http://localhost:${PORT}`);
});
