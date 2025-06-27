import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaBed, FaMoneyBill, FaImage, FaFileAlt } from "react-icons/fa";
import "./Categorias.css";
import { MdOpenInFull, MdOutlineBedroomParent } from "react-icons/md";
export const CategoriaHabitacionForm = ({
  crearCategoriaHabitacion,
  cargarDatos,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false);

  const booleanFields = [
    "tv",
    "aireAcondicionado",
    "coberturaNoctura",
    "veinticuatroHoras",
    "cafetera",
    "minibar",
    "cajaSeguridad",
    "leedAutomatizada",
    "servicioHuesped",
    "despertador",
    "portatil",
    "secador",
    "telefono",
    "vistaAlmar",
  ];

  const onSubmit = async (data) => {
    const parsedData = {
      ...data,
      precioNoche: parseFloat(data.precioNoche),
    };

    booleanFields.forEach((key) => {
      parsedData[key] = data[key] === "true";
    });

    await crearCategoriaHabitacion(parsedData);
    alert("Categoría de habitación creada");
    cargarDatos();
    reset();
  };

  return (
    <>
      <button className="button-categoria" onClick={() => setOpen(!open)}>
        <MdOutlineBedroomParent /> Crear nueva categoría de habitación
        <MdOpenInFull />
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {open && (
          <div className="container-categoria">
            <label>
              <FaBed /> Nombre:
              <input {...register("nombre")} placeholder="Nombre" />
            </label>

            <label>
              <FaMoneyBill /> Precio por noche:
              <input
                type="number"
                {...register("precioNoche")}
                placeholder="Precio"
              />
            </label>

            <label>
              <FaImage /> Foto URL:
              <input {...register("fotoUrl")} placeholder="URL de imagen" />
            </label>

            <label>
              <FaFileAlt /> Descripción:
              <input {...register("descripcion")} placeholder="Descripción" />
            </label>

            <hr />

            <h4>Servicios disponibles (Sí / No)</h4>
            <div className="form-categoria">
              {booleanFields.map((field) => {
                const label = field.replace(/([A-Z])/g, " $1").toLowerCase();

                return (
                  <div className="form-categoria_item" key={field}>
                    <label>{label}:</label>
                    <div className="form-categoria_item_label">
                      <label>
                        <input type="radio" value={true} {...register(field)} />
                        Sí
                      </label>
                      <label>
                        <input
                          type="radio"
                          value={false}
                          {...register(field)}
                        />
                        No
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            <button type="submit">Guardar Categoría</button>
          </div>
        )}
      </form>
    </>
  );
};
