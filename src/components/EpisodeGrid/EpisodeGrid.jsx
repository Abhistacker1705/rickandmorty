import React from 'react';
import {motion} from 'framer-motion';
import styles from './EpisodeGrid.module.css';

const EpisodeGrid = ({episodes, handleEpisodeClick}) => {
  return (
    <div className={styles.gridContainer}>
      {episodes.length ? (
        episodes.map((episode) => (
          <motion.div
            key={episode.id}
            onClick={() => handleEpisodeClick(episode.id)}
            className={styles.card}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}>
            <h3>{episode.name}</h3>
            <p>Episode: {episode.episode}</p>
            <p>Air Date: {episode.air_date}</p>
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

export default EpisodeGrid;
