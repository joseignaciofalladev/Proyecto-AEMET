function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>{weather.municipio}</h2>

      <div className="temp-section">
        <h1>{weather.temperatura.max}°C</h1>
        <p>Min: {weather.temperatura.min}°C</p>
      </div>

      <p>{weather.estadoCielo}</p>
      <p>Lluvia: {weather.lluvia}%</p>
      <p>Viento: {weather.viento} km/h</p>
    </div>
  );
}

export default WeatherCard;
