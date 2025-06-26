import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaBed } from "react-icons/fa";
import { MdOpenInFull } from "react-icons/md";

export const CrearCategoriaCama = ({ crearCategoriaCama, cargarDatos }) => {
  const [open, setOpen] = useState(false);
  const [categoriaCamaData, setCategoriaCamaData] = useState({});
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setCategoriaCamaData(data);

    await crearCategoriaCama(categoriaCamaData);
    alert("Categoría de Cama creada");
    cargarDatos();
    reset();
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} className="button-categoria">
        <FaBed /> Crear Categoría de Cama <MdOpenInFull />
      </button>
      {open && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-categoria">
            <input
              placeholder="Tipo"
              {...register("tipo", { required: true })}
            />
            <input
              placeholder="Medidas"
              {...register("medidas", { required: true })}
            />
            <input
              placeholder="Foto URL"
              {...register("fotoUrl", { required: true })}
            />
            <input
              placeholder="Color"
              {...register("color", { required: true })}
            />

            <button type="submit">Crear Categoría Cama</button>
          </div>
        </form>
      )}
    </>
  );
};
