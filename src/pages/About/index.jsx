import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Minha <span>Discografia</span>
      </h2>
      <p>
        O Minha <span>Discografia </span>nasceu da ideia de criar um blog onde
        as pessoas pudessem compartilhar os seus álbuns preferidos, além de
        conhecer novos estilos musicais através das análises deixadas em cada
        álbum postado.
      </p>
      <Link to="/" className="btn btn-small">
        Voltar pro início
      </Link>
    </div>
  );
};

export default About;
