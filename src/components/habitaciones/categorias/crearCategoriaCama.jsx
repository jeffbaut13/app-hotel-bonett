import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaBed } from "react-icons/fa";
import { MdOpenInFull } from "react-icons/md";
import { crearCama } from "../../../api/hotelAPI";

export const CrearCategoriaCama = ({
  crearCategoriaCama,
  cargarDatos,
  setActiveFormCama,
  activeFormCama,
  setIdCama,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const cateCama = await crearCategoriaCama(data);
      const today = new Date();
      const fechaFormateada = today.toISOString().split("T")[0];

      const payload = {
        serial: `${cateCama.data.tipo}`,
        fechaCama: fechaFormateada,
        categoriaCama: {
          id: parseInt(cateCama.data.id),
        },
      };

      const cama = await crearCama(payload);

      setIdCama(cama.data.id);
      alert("Cama creada");
      cargarDatos();
      reset();
      setActiveFormCama(false);
    } catch (err) {
      console.error(err);
      alert("Error al crear habitación");
    }
  };

  return (
    <>
      {activeFormCama && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-categoria">
            <input
              style={{ marginTop: "1rem" }}
              placeholder="Tipo"
              {...register("tipo", { required: true })}
            />
            <input
              style={{ marginTop: "1rem" }}
              placeholder="Medidas"
              {...register("medidas", { required: true })}
            />
            <input
              style={{ marginTop: "1rem" }}
              placeholder="Foto URL"
              {...register("fotoUrl", { required: true })}
            />
            <input
              style={{ marginTop: "1rem" }}
              placeholder="Color"
              {...register("color", { required: true })}
            />

            <button style={{ marginTop: "1rem" }} type="submit">
              Crear Categoría Cama
            </button>
          </div>
        </form>
      )}
    </>
  );
};
