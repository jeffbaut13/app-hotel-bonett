import { Route, Routes } from "react-router";
import { Home } from "../pages/Home";
import { AuthLayout } from "../layouts/AuthLayout";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { AuthProvider } from "../context/AuthContext";
import { LayoutGlobal } from "../layouts/LayoutGlobal";
import { Habitaciones } from "../pages/Habitaciones";

const RoutesApp = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LayoutGlobal />}>
          <Route index element={<Home />} />
          <Route path="habitaciones" element={<Habitaciones />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
export default RoutesApp;
