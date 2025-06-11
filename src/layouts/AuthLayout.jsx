import { Outlet } from "react-router";
import "./auth.css";

export const AuthLayout = () => {
  return (
    <main className="auth">
      <div className="auth__child">
        <div className="auth__image">
          <figure>
            <img src="/iconos/logo-name.svg" alt="Logo Hotel Bonett" />
          </figure>
        </div>
        <Outlet />
      </div>
    </main>
  );
};
