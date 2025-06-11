import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { logOut } from "../../helpers/exports";

// Componente funcional para mostrar login o logout
const UserLog = () => {
  const { user } = useAuth();

  return (
    <>
      {!user && (
        <Link
          to={{
            pathname: "/login",
          }}
        >
          Login
        </Link>
      )}
      {user && <button onClick={logOut}>Logout</button>}
    </>
  );
};

export const NavBar = () => {
  const links = [
    { label: "Ubicación", path: "/ubicacion" },
    { label: "Habitaciones", path: "/habitaciones" },
  ];

  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
        <li>
          <UserLog />
        </li>
      </ul>
    </nav>
  );
};
