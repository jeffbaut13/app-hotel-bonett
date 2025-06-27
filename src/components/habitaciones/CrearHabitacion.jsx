import { useForm } from "react-hook-form";

export const CrearHabitacion = ({
  categoriasHabitacion,
  camas,
  crearHabitacion,
  asignarCamaAHabitacion,
  cargarDatos,
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
          idCategoriaHabitacion: parseInt(data.idCategoriaHabitacion),
        },
      });

      await asignarCamaAHabitacion({
        idHabitacion: habitacion.idHabitacion,
        idCama: parseInt(data.idCama),
        estado: "Disponible",
      });

      alert("Habitación creada y cama asignada");
      cargarDatos();
      reset();
    } catch (err) {
      console.error(err);
      alert("Error al crear habitación");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Crear Habitación</h3>

        <input
          placeholder="Número de habitación"
          {...register("nombre", { required: "El nombre es obligatorio" })}
        />
        {errors.nombre && <p>{errors.nombre.message}</p>}

        <input
          placeholder="Piso"
          type="number"
          {...register("piso", {
            required: "El piso es obligatorio",
            valueAsNumber: true,
          })}
        />
        {errors.piso && <p>{errors.piso.message}</p>}

        <input
          placeholder="Teléfono"
          type="number"
          {...register("telefono", {
            required: "El teléfono es obligatorio",
            valueAsNumber: true,
          })}
        />
        {errors.telefono && <p>{errors.telefono.message}</p>}

        <select
          {...register("idCategoriaHabitacion", {
            required: "Seleccione una categoría",
          })}
        >
          <option value="">Seleccione Categoría</option>
          {categoriasHabitacion.map((c) => (
            <option
              key={c.idCategoriaHabitacion}
              value={c.idCategoriaHabitacion}
            >
              {c.nombre}
            </option>
          ))}
        </select>
        {errors.idCategoriaHabitacion && (
          <p>{errors.idCategoriaHabitacion.message}</p>
        )}

        <select {...register("idCama", { required: "Seleccione una cama" })}>
          <option value="">Seleccione Cama</option>
          {camas.map((c) => (
            <option key={c.id} value={c.id}>
              Cama #{c.serial}
            </option>
          ))}
        </select>
        {errors.idCama && <p>{errors.idCama.message}</p>}

        <button type="submit">Crear nueva habitación</button>
      </form>
    </>
  );
};
