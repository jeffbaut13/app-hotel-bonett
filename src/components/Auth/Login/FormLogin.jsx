import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import { apiUrl } from "../../../helpers/exports";
import { Link } from "react-router";
import { IconHead } from "../../header/IconHead";

export const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.mensaje[0] || "Error en el login");
        return;
      }

      const userData = await res.json();
      setUser(userData);
      alert("¡Login exitoso!");
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
        <h2>Iniciar sesión</h2>
      </div>
      <div className="auth__input">
        <input {...register("email", { required: true })} placeholder="Email" />
        {errors.email && <span className="error">Email es obligatorio</span>}
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
        <button type="submit">Login</button>
      </div>

      <div className="w-full flex flexCenter flex-col">
        <p>
          ¿Aún no te has registrado?,&nbsp;
          <Link to={"/registro"}>Regístrate ahora</Link>
        </p>
         
      </div>
    </form>
  );
};
