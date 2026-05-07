import { useState } from "react";
import { getWeather } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";
import { municipios } from "./data/municipios";

function App() {

  // Estados necesarios
  const [codigo, setCodigo] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {

    // validacion bosica: evitar busquedas vacias
    if (!codigo) {
      setError("Elija un municipio, por favor.");
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

      {/* input nuevo, cambio lo de poner el codigo, por un selector de municipios */}
      <select
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      >
        <option value="">Selecciona un municipio</option>

        {municipios.map((m) => (
          <option key={m.codigo} value={m.codigo}>
            {m.nombre}
          </option>
        ))}
      </select>

      <button onClick={handleSearch}>Buscar</button>

      {/* mensajes de carga y error */}
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {/* muestreo del weather, aun no siendo componente para ver si funciona la conexion end a end */}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );

  // para resolver errores
  console.log(data);
  console.log(weather);
}

export default App;
