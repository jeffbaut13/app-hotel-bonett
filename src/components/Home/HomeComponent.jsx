import { FormBook } from "./FormBook";
import "./HomeComponent.css";
export const HomeComponent = () => {
  return (
    <main className="home">
      <div className="home__main max-w">
        <div className="home__main_content">
          <figure>
            <img src="/iconos/logo-name.svg" alt="Logo Hotel Bonett" />
          </figure>
          <FormBook />
        </div>
        <div className="home__content" />
      </div>
    </main>
  );
};
