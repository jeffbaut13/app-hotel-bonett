import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAddCircle, IoMdCloseCircle } from "react-icons/io";

export const CrearHabitacion = ({
  categoriasHabitacion,
  camas,
  crearHabitacion,
  asignarCamaAHabitacion,
  cargarDatos,
  setActiveForm,
  activeForm,
  setActiveFormCama,
  activeFormCama,
  categoriaHabitacion,
  setCategoriaHabitacion,
  idCama,
  setIdCama,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const habitacion = await crearHabitacion({
        nombre: data.nombre,
        piso: parseInt(data.piso),
        telefono: parseInt(data.telefono),
        categoriaHabitacion: {
          idCategoriaHabitacion: parseInt(categoriaHabitacion),
        },
      });

      await asignarCamaAHabitacion({
        idHabitacion: habitacion.idHabitacion,
        idCama: parseInt(idCama),
        estado: "Disponible",
      });

      alert("Habitación creada");
      cargarDatos();
      reset();
      setCategoriaHabitacion(null);
      setIdCama(null);
    } catch (err) {
      console.error(err);
      alert("Error al crear habitación");
    }
  };

  return (
    <>
      <form
        className="habitaciones_form mt-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder="Número de habitación"
          {...register("nombre", { required: "El nombre es obligatorio" })}
        />
        {errors.nombre && <p className="error">{errors.nombre.message}</p>}

        <input
          placeholder="Piso"
          type="number"
          {...register("piso", {
            required: "El piso es obligatorio",
            valueAsNumber: true,
          })}
        />
        {errors.piso && <p className="error">{errors.piso.message}</p>}

        <input
          placeholder="Teléfono"
          type="number"
          {...register("telefono", {
            required: "El teléfono es obligatorio",
            valueAsNumber: true,
          })}
        />
        {errors.telefono && <p className="error">{errors.telefono.message}</p>}

        {!activeFormCama && (
          <div className="w-full">
            <h2 className="mt-2">Selecciona o crea un tipo de habitación</h2>
            <div className="flex categorias">
              {categoriasHabitacion.map((c) => (
                <span
                  className={`items ${
                    categoriaHabitacion == c.idCategoriaHabitacion
                      ? "active"
                      : ""
                  }`}
                  key={c.idCategoriaHabitacion}
                  onClick={() =>
                    setCategoriaHabitacion(c.idCategoriaHabitacion)
                  }
                >
                  {c.nombre}
                </span>
              ))}
              <span
                className="items nueva"
                onClick={() => setActiveForm(!activeForm)}
              >
                {activeForm ? (
                  <>
                    <IoMdCloseCircle /> Cerrar
                  </>
                ) : (
                  <>
                    <IoMdAddCircle /> Nueva habitación
                  </>
                )}
              </span>
            </div>
          </div>
        )}

        {!activeForm && (
          <div className="w-full">
            <h2>Selecciona o crea una cama</h2>
            <div className="flex categorias">
              {camas.map((c) => (
                <div
                  style={{ height: "100%" }}
                  className={`items card-cama ${
                    idCama == c.id ? "active" : ""
                  }`}
                  key={c.id}
                  onClick={() => setIdCama(c.id)}
                >
                  <div>
                    <h4>{c.serial}</h4>
                    <p>{c.categoriaCama?.medidas}</p>
                    <p>{c.categoriaCama?.color}</p>
                  </div>

                  <figure
                    style={{
                      width: "4rem",
                      height: "auto",
                      display: "inline-block",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      src={c.categoriaCama?.fotoUrl}
                      alt=""
                    />
                  </figure>
                </div>
              ))}
              <span
                className="items nueva"
                onClick={() => setActiveFormCama(!activeFormCama)}
              >
                {activeFormCama ? (
                  <>
                    <IoMdCloseCircle /> Cerrar
                  </>
                ) : (
                  <>
                    <IoMdAddCircle /> Nueva cama
                  </>
                )}
              </span>
            </div>
          </div>
        )}

        {!activeFormCama && !activeForm && (
          <button type="submit">Crear nueva habitación</button>
        )}
      </form>
    </>
  );
};
