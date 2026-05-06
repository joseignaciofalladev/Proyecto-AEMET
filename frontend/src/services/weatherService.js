export const getWeather = async (codigo) => {
  const response = await fetch(
    `http://localhost:3000/api/tiempo/${codigo}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener datos");
  }

  return response.json();
};