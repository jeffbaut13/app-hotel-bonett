import { createContext, useContext, useState, useEffect } from "react";
import { apiUrl } from "../helpers/exports";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verificarUsuario = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/auth/verificar-usuario`, {
        credentials: "include",
      });

      const data = await res.json();

      if (data.loggedIn === false) {
        console.log(data.message);
        setUser(null);
      } else {
        setUser(data);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verificarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
