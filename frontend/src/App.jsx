import { useState } from "react";
import { getWeather } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";

function App() {

  // Estados necesarios
  const [codigo, setCodigo] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {

    // validacion bosica: evitar busquedas vacias
    if (!codigo.trim()) {
      setError("Introduce un código");
      return;
    }

    try {

      // para activar el loading y limpiar errores anteriores
      setLoading(true);
      setError("");

      // llamada al backend (fetch encapsulado en service)
      const data = await getWeather(codigo);

      // se guarda solo los datos necesarios del data.data viene del backend
      setWeather(data.data);

    } catch (err) {

      // pori falla la peticion
      setError("Error al obtener datos");
      setWeather(null);
    } finally {

      // siempre ejecutar aunque de error
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Busqueda por municipio</h1>

      {/* priemr input */}
      <input
        type="text"
        placeholder="Código municipio (ej: 28079)"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />

      <button onClick={handleSearch}>Buscar</button>

      {/* mensajes de carga y error */}
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {/* muestreo del weather, aun no siendo componente para ver si funciona la conexion end a end */}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );

  // para resolver unos errores
  console.log(data);
  console.log(weather);
}

export default App;
