import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../hooks/useAuthValue";
import { useLogout } from "../../hooks/useLogout";
import styles from "./styles.module.scss";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { user } = useAuthValue();
  const { logout } = useLogout();

  const handleToggleMenu = () => {
    if (!menu) {
      setMenu(true);
      return;
    }
    setMenu(false);
  };
  return (
    <header>
      <nav className={styles.navbar}>
        <Link to="/">
          Minha <span>Discografia</span>
        </Link>
        <ul
          className={
            menu
              ? `${styles.navbar_menu} ${styles.actived}`
              : styles.navbar_menu
          }
        >
          <li className={styles.navbar_item} onClick={handleToggleMenu}>
            <Link to="/">Home</Link>
          </li>
          {!user && (
            <>
              <li className={styles.navbar_item} onClick={handleToggleMenu}>
                <Link to="/login">Entrar</Link>
              </li>
              <li className={styles.navbar_item} onClick={handleToggleMenu}>
                <Link to="/register">Cadastrar</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className={styles.navbar_item} onClick={handleToggleMenu}>
                <Link to="/posts/create">Novo post</Link>
              </li>
              <li className={styles.navbar_item} onClick={handleToggleMenu}>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
          )}
          <li className={styles.navbar_item} onClick={handleToggleMenu}>
            <Link to="/about">Sobre</Link>
          </li>
          {user && (
            <li className={styles.navbar_item}>
              <button
                className="navbar-btn"
                onClick={() => {
                  logout(), handleToggleMenu();
                }}
              >
                Sair
              </button>
            </li>
          )}
        </ul>
        <div
          className={
            menu ? `${styles.hamburguer} ${styles.actived}` : styles.hamburguer
          }
          onClick={handleToggleMenu}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
