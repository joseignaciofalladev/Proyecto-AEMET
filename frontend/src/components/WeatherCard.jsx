function WeatherCard({ weather }) {
  return (
    <div style={{
      marginTop: "20px",
      padding: "20px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      <h2>{weather.municipio}</h2>
      <p>{weather.provincia}</p>

      <p><strong>Fecha:</strong> {weather.fecha}</p>

      <p>Max: {weather.temperatura.max}°C</p>
      <p>Min: {weather.temperatura.min}°C</p>

      <p>{weather.estadoCielo}</p>
      <p>{weather.lluvia}% lluvia</p>
      <p>{weather.viento} km/h</p>
    </div>
  );
}

export default WeatherCard;
