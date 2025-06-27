import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaBed } from "react-icons/fa";
import { MdOpenInFull } from "react-icons/md";

export const CrearCama = ({ crearCama, categoriasCama, cargarDatos }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const fecha = new Date(data.fechaCama);

    const fechaFormateada = fecha.toISOString().split("T")[0];

    const payload = {
      serial: data.serial,
      fechaCama: fechaFormateada,
      categoriaCama: {
        id: parseInt(data.categoriaCama),
      },
    };

    await crearCama(payload);
    alert("Cama creada exitosamente");
    cargarDatos();
    reset();
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} className="button-categoria">
        <FaBed /> Crear Cama <MdOpenInFull />
      </button>
      {open && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-categoria">
            <input
              placeholder="serial"
              {...register("serial", { required: true })}
            />
            <input
              type="date"
              placeholder="Fecha Cama"
              {...register("fechaCama", { required: true })}
            />
            <select {...register("categoriaCama", { required: true })}>
              <option value="">Seleccione Categoría de Cama</option>
              {categoriasCama.map((c, i) => (
                <option key={i} value={c.id}>
                  {c.tipo}
                </option>
              ))}
            </select>
            <button type="submit">Crear Cama</button>
          </div>
        </form>
      )}
    </>
  );
};
