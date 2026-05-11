function WeatherCard({ weather }) {
  const hoy = weather.dias[0];
  return (
    <div className="weather-card">

      <h2>{weather.municipio}</h2>
      <p>{weather.provincia}</p>

      <div className="today-weather">
        <h1>{hoy.temperatura.max}°C</h1>
        <p>Min: {hoy.temperatura.min}°C</p>
        <p>{hoy.estadoCielo}</p>
        <p>{hoy.lluvia}%</p>
        <p>{hoy.viento} km/h</p>
      </div>

      <div className="forecast-container">

        {weather.dias.slice(1).map((dia, index) => (

          <div key={index} className="forecast-card">
            <h4>{new Date(dia.fecha).toLocaleDateString()}</h4>
            <p>{dia.temperatura.max}°</p>
            <p>{dia.temperatura.min}°</p>
            <p>{dia.lluvia}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;
