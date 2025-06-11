import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { apiUrl } from "../../../helpers/exports";
import { useAuth } from "../../../context/AuthContext";
import { IconHead } from "../../header/IconHead";

export const FormRegistro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      //return console.log(`${apiUrl}/api/auth/registro`);

      const res = await fetch(`${apiUrl}/api/auth/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.mensaje[0] || "Error en el registro");
        return;
      }

      const userData = await res.json();
      setUser(userData);
      alert("¡Registro exitoso!");
      // Redirige a Home si quieres, por ejemplo: navigate("/")
    } catch (error) {
      console.error(error);
      alert("Error en la petición");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="auth__head flex flexCenter flex-col">
        <figure className="auth__head_icon">
          <IconHead />
        </figure>
        <h2>Registro</h2>
      </div>

      <div className="auth__input">
        <input
          {...register("username", { required: true })}
          placeholder="Usuario"
        />
        {errors.username && <span className="error">Usuario obligatorio</span>}
      </div>
      <div className="auth__input">
        <input {...register("email", { required: true })} placeholder="Email" />
        {errors.email && <span className="error">Email obligatorio</span>}
      </div>
      <div className="auth__input">
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Contraseña"
        />
        {errors.password && (
          <span className="error">Contraseña obligatoria</span>
        )}
      </div>
      <div className="auth__input_button">
        <button type="submit">Registrarme</button>
      </div>
      <div className="w-full flex flexCenter flex-col">
        <p>
          ¿Ya te has registrado?,&nbsp;<Link to={"/login"}> Inicia Sesión</Link>
        </p>
      </div>
    </form>
  );
};
