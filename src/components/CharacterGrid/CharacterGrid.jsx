import {Link} from 'react-router-dom';

import styles from './CharacterGrid.module.css';
import {motion} from 'framer-motion';

const CharacterGrid = ({characters}) => {
  return (
    <div className={styles.grid}>
      {characters.length ? (
        characters.map((character, index) => (
          <Link
            to={`/characters/${character.id}`}
            key={character.id}
            className={styles.linkStyle}>
            <motion.div
              initial={{y: -6, opacity: 0}}
              animate={{
                y: 0,
                opacity: 1,
                transition: {delay: index * 0.125, ease: 'easeInOut'},
              }}
              className={styles.card}>
              <img
                src={character.image}
                alt={character.name}
                className={styles.image}
              />
              <h3>{character.name}</h3>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
            </motion.div>
          </Link>
        ))
      ) : (
        <div>
          <h2>Nothing here</h2>
        </div>
      )}
    </div>
  );
};

export default CharacterGrid;
