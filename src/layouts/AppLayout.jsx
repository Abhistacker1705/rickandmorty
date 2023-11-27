import {motion} from 'framer-motion';
import styles from './AppLayout.module.css';
import {Link, useLocation} from 'react-router-dom';

const AppLayout = ({children}) => {
  const initial = {x: -10, opacity: 0.3};
  const animate = {x: 0, opacity: 1};

  const location = useLocation();

  return (
    <motion.div
      className={styles.container}
      initial={initial}
      animate={animate}>
      <Navbar location={location} />
      {children}
    </motion.div>
  );
};

export default AppLayout;

const Navbar = ({location}) => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={'/RickandMortyLogo.svg'} alt="Rick and Morty" />
      </Link>
      <ul className={styles.navLinks}>
        <li>
          <Link
            className={
              location.pathname.includes('/characters')
                ? styles.anchors_active
                : styles.anchors
            }
            to="/characters">
            Characters
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname.includes('/locations')
                ? styles.anchors_active
                : styles.anchors
            }
            to="/locations">
            Locations
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname.includes('/episodes')
                ? styles.anchors_active
                : styles.anchors
            }
            to="/episodes">
            Episodes
          </Link>
        </li>
      </ul>
    </nav>
  );
};
