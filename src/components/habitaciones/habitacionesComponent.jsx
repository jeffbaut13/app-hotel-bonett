import React, { useEffect, useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { LuLampFloor } from "react-icons/lu";
import { FaBed } from "react-icons/fa";
import {
  obtenerHabitaciones,
  crearHabitacion,
  eliminarHabitacion,
  crearCategoriaHabitacion,
  crearCategoriaCama,
  obtenerCategoriasHabitacion,
  obtenerCategoriasCama,
  obtenerCamas,
  asignarCamaAHabitacion,
  getCamaHabitacion,
  obtenerCamaID,
} from "../../api/hotelAPI";
import { CategoriaHabitacionForm } from "../../components/habitaciones/categorias/crearCategoriaHabitacion";
import "./habitacionesComponent.css";
import { CrearCategoriaCama } from "./categorias/crearCategoriaCama";

import { CrearHabitacion } from "./CrearHabitacion";
export const HabitacionesComponent = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [camas, setCamas] = useState([]);
  const [categoriasHabitacion, setCategoriasHabitacion] = useState([]);
  const [categoriasCama, setCategoriasCama] = useState([]);

  const [categoriaHabitacion, setCategoriaHabitacion] = useState(null);
  const [idCama, setIdCama] = useState(null);

  const [activeForm, setActiveForm] = useState(false);
  const [activeFormCama, setActiveFormCama] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // Obtener todos los datos básicos en paralelo
      const [habRes, catHabRes, catCamaRes, camasRes] = await Promise.all([
        obtenerHabitaciones(),
        obtenerCategoriasHabitacion(),
        obtenerCategoriasCama(),
        obtenerCamas(),
      ]);
      setCategoriasHabitacion(catHabRes.data);
      setCategoriasCama(catCamaRes.data);
      setCamas(camasRes.data);

      const habitacionesConCamas = await Promise.all(
        habRes.data.map(async (habitacion) => {
          // Obtener las camas asociadas a esta habitación
          const camasHabitacionRes = await getCamaHabitacion(
            habitacion.idHabitacion
          );

          // Enriquecer cada cama con sus detalles completos
          const camasCompletas = await Promise.all(
            camasHabitacionRes.data.map(async (camaHabitacion) => {
              const cama = await obtenerCamaID(camaHabitacion.idCama);

              return cama.data.categoriaCama;
            })
          );

          return {
            ...habitacion,
            camas: camasCompletas.filter((c) => c), // Filtramos posibles valores nulos
          };
        })
      );

      setHabitaciones(habitacionesConCamas);
    } catch (error) {
      console.error("Error al cargar datos completos:", error);
    }
  };

  const handleEliminarHabitacion = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta habitación?")) {
      await eliminarHabitacion(id);

      cargarDatos();
    }
  };

  return (
    <div className="habitaciones max-w">
      {habitaciones.length < 1 && (
        <h1 className="w-full flex flexCenter">Crea una habitacion ahora</h1>
      )}

      <div className="habitaciones_container flex mt-2">
        {habitaciones.length >= 1 && (
          <ul className="flex card_hotel">
            <h2 className="w-full">habitaciones disponibles</h2>
            {habitaciones.map((h) => (
              <li className="card_hotel_item" key={h.idHabitacion}>
                <h4 className="card_hotel__title_fixed">
                  {h.categoriaHabitacion.nombre}
                </h4>
                <figure className="habitacion_imagen">
                  <img
                    src={h.categoriaHabitacion.fotoUrl}
                    alt={h.categoriaHabitacion.descripcion}
                  />
                </figure>
                <div className="head_content">
                  <h2 className="head_content__title">
                    Habitación # {h.nombre}
                  </h2>
                  <div className="flex head_content__title_items">
                    <div>
                      <LuLampFloor /> Piso #{h.piso}
                    </div>
                    <div>
                      <BsFillTelephoneFill /> {h.telefono}
                    </div>
                    <div>
                      <FaBed /> tipo {h.camas.map((item) => item.tipo)}
                    </div>
                  </div>
                  <p>{h.categoriaHabitacion.descripcion}</p>
                  <button
                    className="btn"
                    onClick={() => handleEliminarHabitacion(h.idHabitacion)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="habitaciones_Edit">
          {habitaciones.length >= 1 && <h2>Crea otra habitación</h2>}
          <CrearHabitacion
            categoriasHabitacion={categoriasHabitacion}
            camas={camas}
            crearHabitacion={crearHabitacion}
            asignarCamaAHabitacion={asignarCamaAHabitacion}
            cargarDatos={cargarDatos}
            setActiveForm={setActiveForm}
            activeForm={activeForm}
            setActiveFormCama={setActiveFormCama}
            activeFormCama={activeFormCama}
            categoriaHabitacion={categoriaHabitacion}
            setCategoriaHabitacion={setCategoriaHabitacion}
            idCama={idCama}
            setIdCama={setIdCama}
          />

          <CategoriaHabitacionForm
            crearCategoriaHabitacion={crearCategoriaHabitacion}
            cargarDatos={cargarDatos}
            activeForm={activeForm}
            setActiveForm={setActiveForm}
            setCategoriaHabitacion={setCategoriaHabitacion}
          />
          <CrearCategoriaCama
            crearCategoriaCama={crearCategoriaCama}
            cargarDatos={cargarDatos}
            setActiveFormCama={setActiveFormCama}
            activeFormCama={activeFormCama}
            categoriasCama={categoriasCama}
            idCama={idCama}
            setIdCama={setIdCama}
          />
        </div>
      </div>
    </div>
  );
};
