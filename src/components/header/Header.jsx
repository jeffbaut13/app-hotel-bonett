import "./header.css";
import { IconHead } from "./IconHead";
import { NavBar } from "./NavBar";
export const Header = () => {
  return (
    <header className="">
      <div className="header-content w-full max-w flex">
        <figure style={{ width: "2.5rem", margin: "0" }}>
          <IconHead />
        </figure>
        <NavBar />
      </div>
    </header>
  );
};
