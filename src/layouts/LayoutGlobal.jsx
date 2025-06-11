import { Outlet } from "react-router";
import { Header } from "../components/header/Header";

export const LayoutGlobal = () => {
  return (
    < >
      <Header />
      <Outlet />
    </>
  );
};
