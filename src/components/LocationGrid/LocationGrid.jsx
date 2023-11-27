import {motion} from 'framer-motion';
import styles from './LocationGrid.module.css';

const LocationGrid = ({locations, handleLocationClick}) => {
  return (
    <div className={styles.gridContainer}>
      {locations.length ? (
        locations.map((location) => (
          <motion.div
            key={location.id}
            onClick={() => handleLocationClick(location.id)}
            className={styles.card}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}>
            <h3>{location.name}</h3>
            <p>Type: {location.type}</p>
            <p>Dimension: {location.dimension}</p>
          </motion.div>
        ))
      ) : (
        <div>
          <h2>Nothing Found</h2>
        </div>
      )}
    </div>
  );
};

export default LocationGrid;
