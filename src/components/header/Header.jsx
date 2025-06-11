import "./header.css";
import { IconHead } from "./IconHead";
import { NavBar } from "./NavBar";
export const Header = () => {
  return (
    <header className="max-w">
      <figure style={{ width: "2.5rem", margin: "0" }}>
        <IconHead />
      </figure>
      <NavBar />
    </header>
  );
};
