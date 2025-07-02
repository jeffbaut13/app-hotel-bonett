import axios from "axios";

// URL base definida en tus variables de entorno (VITE_API_HOTEL)
export const apiUrlHotel = import.meta.env.VITE_API_HOTEL;

// Instancia de Axios con la base de tu API
const api = axios.create({
  baseURL: `${apiUrlHotel}/api`,
  responseType: 'json', // Asegúrate de que es json
  responseEncoding: 'utf8', // Explicitamente usa UTF-8
});

// ==========================
// HABITACIONES
// ==========================
export const obtenerHabitaciones = () => api.get("/habitaciones");
export const crearHabitacion = async (data) => {
  const response = await api.post("/habitaciones", data);
  return response.data; //
};

export const editarHabitacion = (id, data) =>
  api.put(`/habitaciones/${id}`, data);
export const eliminarHabitacion = (id) => api.delete(`/habitaciones/${id}`);

// ==========================
// CATEGORÍAS DE HABITACIÓN
// ==========================
export const obtenerCategoriasHabitacion = () =>
  api.get("/categoria-habitacion");
export const crearCategoriaHabitacion = (data) =>
  api.post("/categoria-habitacion", data);

// ==========================
// CATEGORÍAS DE CAMA
// ==========================
export const obtenerCategoriasCama = () => api.get("/categoria-camas");

export const crearCategoriaCama = (data) => api.post("/categoria-camas", data);

// ==========================
// CAMAS
// ==========================
export const obtenerCamas = () => api.get("/camas");
export const obtenerCamaID = (idCama) => api.get(`/camas/${idCama}`);
export const crearCama = (data) => api.post("/camas", data);

// ==========================
// CAMAS EN HABITACIÓN
// ==========================
export const getCamaHabitacion = (idHabitacion) =>
  api.get(`/cama-habitacion/habitacion/${idHabitacion}`);
export const asignarCamaAHabitacion = (data) =>
  api.post("/cama-habitacion", data);

export default api;
