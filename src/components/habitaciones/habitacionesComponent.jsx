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
export const HabitacionesComponent = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [camas, setCamas] = useState([]);
  const [categoriasHabitacion, setCategoriasHabitacion] = useState([]);
  const [categoriasCama, setCategoriasCama] = useState([]);

  const [habitacionData, setHabitacionData] = useState({
    nombre: "",
    piso: "",
    telefono: "",
    idCategoriaHabitacion: "",
  });

  const [categoriaCamaData, setCategoriaCamaData] = useState({
    tipo: "",
    medidas: "",
    fotoUrl: "",
    color: "",
  });

  const [camaData, setCamaData] = useState({
    reciboUrl: "",
    fechaCama: "",
    categoriaCama: "",
  });

  const [asignacionCama, setAsignacionCama] = useState({
    idHabitacion: "",
    idCama: "",
    estado: "disponible",
  });

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

  const handleCrearCama = async () => {
    // Asegúrate de que camaData.fechaCama sea un objeto Date válido
    const fecha = new Date(camaData.fechaCama);

    // Formatea la fecha como yyyy-MM-dd
    const fechaFormateada = fecha.toISOString().split("T")[0];

    await crearCama({
      reciboUrl: camaData.reciboUrl,
      fechaCama: fechaFormateada,
      categoriaCama: { id: parseInt(camaData.categoriaCama) }, // Asegúrate que sea 'categoriaCama'
    });

    alert("Cama creada");
    cargarDatos();
  };

  const handleCrearHabitacion = async () => {
    await crearHabitacion({
      nombre: habitacionData.nombre,
      piso: parseInt(habitacionData.piso),
      telefono: parseInt(habitacionData.telefono),
      categoriaHabitacion: {
        idCategoriaHabitacion: parseInt(habitacionData.idCategoriaHabitacion),
      },
    });
    alert("Habitación creada");
    cargarDatos();
  };

  const handleEliminarHabitacion = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta habitación?")) {
      await eliminarHabitacion(id);
      alert("Habitación eliminada");
      cargarDatos();
    }
  };

  const handleAsignarCama = async () => {
    await asignarCamaAHabitacion({
      idHabitacion: parseInt(asignacionCama.idHabitacion),
      idCama: parseInt(asignacionCama.idCama),
      estado: asignacionCama.estado,
    });
    alert("Cama asignada a habitación");
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

      <h3>Crear Habitación</h3>
      <input
        placeholder="Nombre"
        onChange={(e) =>
          setHabitacionData({ ...habitacionData, nombre: e.target.value })
        }
      />
      <input
        placeholder="Piso"
        onChange={(e) =>
          setHabitacionData({ ...habitacionData, piso: e.target.value })
        }
      />
      <input
        placeholder="Teléfono"
        onChange={(e) =>
          setHabitacionData({ ...habitacionData, telefono: e.target.value })
        }
      />
      <select
        onChange={(e) =>
          setHabitacionData({
            ...habitacionData,
            idCategoriaHabitacion: e.target.value,
          })
        }
      >
        <option value="">Seleccione Categoría</option>
        {categoriasHabitacion.map((c) => (
          <option key={c.idCategoriaHabitacion} value={c.idCategoriaHabitacion}>
            {c.nombre}
          </option>
        ))}
      </select>
      <button onClick={handleCrearHabitacion}>Crear Habitación</button>

      <h3>Crear Cama</h3>
      <input
        placeholder="Recibo URL"
        onChange={(e) =>
          setCamaData({ ...camaData, reciboUrl: e.target.value })
        }
      />
      <input
        placeholder="Fecha Cama"
        type="date"
        onChange={(e) =>
          setCamaData({ ...camaData, fechaCama: e.target.value })
        }
      />
      <select
        onChange={(e) =>
          setCamaData({ ...camaData, categoriaCama: e.target.value })
        }
      >
        <option value="">Seleccione Categoría de Cama</option>
        {categoriasCama.map((c, i) => (
          <option key={i} value={c.id}>
            {c.tipo}
          </option>
        ))}
      </select>
      <button onClick={handleCrearCama}>Crear Cama</button>

      <h3>Asignar Cama a Habitación</h3>
      <select
        onChange={(e) =>
          setAsignacionCama({ ...asignacionCama, idHabitacion: e.target.value })
        }
      >
        <option value="">Seleccione Habitación</option>
        {habitaciones.map((h) => (
          <option key={h.idHabitacion} value={h.idHabitacion}>
            {h.nombre}
          </option>
        ))}
      </select>
      <select
        onChange={(e) =>
          setAsignacionCama({ ...asignacionCama, idCama: e.target.value })
        }
      >
        <option value="">Seleccione Cama</option>
        {camas.map((c, i) => (
          <option key={i} value={c.idCama}>
            Cama #{c.idCama}
          </option>
        ))}
      </select>
      <button onClick={handleAsignarCama}>Asignar Cama</button>
    </div>
  );
};
