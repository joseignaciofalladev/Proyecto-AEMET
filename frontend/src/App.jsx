import { useState, useEffect } from "react";
import { getWeather } from "./services/weatherService";
import { municipios } from "./data/municipios";
import WeatherCard from "./components/WeatherCard";
import Header from "./components/Header";

function App() {

  // Estados necesarios
  const [search, setSearch] = useState("");
  const [filteredMunicipios, setFilteredMunicipios] = useState([]);
  const [history, setHistory] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Uso de efectos
  
  // para cargar el historial
  useEffect(() => {
    const savedHistory = localStorage.getItem("weatherHistory");
    if (savedHistory) {setHistory(JSON.parse(savedHistory));}
  },[]);

  // para guardar el historial
  useEffect(() => {
    localStorage.setItem(
      "weatherHistory",
      JSON.stringify(history)
    );
  },[history]);

  // para cargar el modo oscuro
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {setDarkMode(JSON.parse(savedTheme));}
  },[]);

  // para guardar el modo oscuro
  useEffect(() => {
    localStorage.setItem("darkMode",JSON.stringify(darkMode));
  },[darkMode]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // cuando se ponga dos letras, se filtra y se muestra las coincidencias con los nombres deloc municipios
    if (value.length < 2) {
      setFilteredMunicipios([]);
      return;
    }

    const resultados = municipios.filter((m) =>m.nombre.toLowerCase().includes(value.toLowerCase()));
    setFilteredMunicipios(resultados);
  };

  // busqueda del clima
  const handleSelectMunicipio = async (municipio) => {
    try {
      setLoading(true);
      setError("");
      setSearch(municipio.nombre);
      setFilteredMunicipios([]);

      const response = await getWeather(municipio.codigo);
      setWeather(response.data);

      // guarda la nueva busqueda
      const nuevaBusqueda = {
        municipio: municipio.nombre,
        codigo: municipio.codigo,
        fecha: new Date().toLocaleString(),
      };

      // para evitar duplicados en el historial, asi se evita varias busquedas del mismo y se vuelve a la primera fila
      setHistory((prev) => {
        const filtrado = prev.filter((item) => item.codigo !== municipio.codigo);
        return [nuevaBusqueda, ...filtrado];
      });

      // captura de error/ finalizacion de carga
    } catch (err) {
      setError("Error obteniendo datos");
    } finally {
      setLoading(false);
    }
  };

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
    <div className={darkMode ? "app dark" : "app"}>
      <Header />

      {/* boton de cambio entre modo dia y noche */}
      <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? "Modo día" : "Modo noche"}</button>

      {/* input nuevo, cambio lo de poner el codigo, por un buscador de municipios */}
      <input
        type="text"
        placeholder="Buscar municipio..."
        value={search}
        onChange={handleSearchChange}
      />

      {/* filtro de municipios, se muestra los municipios filtrados en botones */}
      {filteredMunicipios.length > 0 && (
        <ul className="results-list">
          {filteredMunicipios.map((m) => (
            <li key={m.codigo}onClick={() => handleSelectMunicipio(m)}>
              {m.nombre}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleSearch}>Buscar</button>

      {/* mensajes de carga y error */}
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {/* muestreo del weather */}
      {weather && <WeatherCard weather={weather} />}

      {/* Historial */}
      {history.length > 0 && (
        <div className="history-container">
          <h3>Historial de búsquedas</h3>
          <div className="history-list">
            {history.map((item) => (
              <button
                key={item.codigo}
                className="history-item"
                onClick={() =>
                  handleSelectMunicipio({
                    nombre: item.municipio,
                    codigo: item.codigo
                  })
                }
              >
                <strong>{item.municipio}</strong>
                <span>{item.fecha}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setHistory([])}>Limpiar historial</button>
        </div>
      )}
    </div>
  );
}

export default App;
