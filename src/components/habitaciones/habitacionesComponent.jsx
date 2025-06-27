import React, { useEffect, useState } from "react";
import {
  obtenerHabitaciones,
  crearHabitacion,
  eliminarHabitacion,
  crearCategoriaHabitacion,
  crearCategoriaCama,
  crearCama,
  obtenerCategoriasHabitacion,
  obtenerCategoriasCama,
  obtenerCamas,
  asignarCamaAHabitacion,
} from "../../api/hotelAPI";
import { CategoriaHabitacionForm } from "../../components/habitaciones/categorias/crearCategoriaHabitacion";
import "./habitacionesComponent.css";
import { CrearCategoriaCama } from "./categorias/crearCategoriaCama";
import { CrearCama } from "./categorias/crearCama";
import { CrearHabitacion } from "./CrearHabitacion";
export const HabitacionesComponent = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [camas, setCamas] = useState([]);
  const [categoriasHabitacion, setCategoriasHabitacion] = useState([]);
  const [categoriasCama, setCategoriasCama] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const [habRes, catHabRes, catCamaRes, camasRes] = await Promise.all([
      obtenerHabitaciones(),
      obtenerCategoriasHabitacion(),
      obtenerCategoriasCama(),
      obtenerCamas(),
    ]);
    setHabitaciones(habRes.data);
    setCategoriasHabitacion(catHabRes.data);
    setCategoriasCama(catCamaRes.data);
    setCamas(camasRes.data);
  };

  const handleEliminarHabitacion = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta habitación?")) {
      await eliminarHabitacion(id);
      alert("Habitación eliminada");
      cargarDatos();
    }
  };

  return (
    <div className="habitaciones max-w">
      <CategoriaHabitacionForm
        crearCategoriaHabitacion={crearCategoriaHabitacion}
        cargarDatos={cargarDatos}
      />
      <CrearCategoriaCama
        crearCategoriaCama={crearCategoriaCama}
        cargarDatos={cargarDatos}
      />

      <CrearCama
        crearCama={crearCama}
        categoriasCama={categoriasCama}
        cargarDatos={cargarDatos}
      />

      <h2>Habitaciones Disponibles</h2>
      <ul>
        {habitaciones.map((h) => (
          <li key={h.idHabitacion}>
            {h.nombre} - Piso {h.piso} - Teléfono {h.telefono}
            <button onClick={() => handleEliminarHabitacion(h.idHabitacion)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <CrearHabitacion
        categoriasHabitacion={categoriasHabitacion}
        camas={camas}
        crearHabitacion={crearHabitacion}
        asignarCamaAHabitacion={asignarCamaAHabitacion}
        cargarDatos={cargarDatos}
      />
    </div>
  );
};
