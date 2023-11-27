import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {axiosInstance} from '../../services/datafetch';
import styles from './CharacterProfile.module.css';
import {EpisodeContext} from '../../context/EpisodeContext';
import axios from 'axios';

const CharacterProfile = () => {
  const {characterId} = useParams();
  const [character, setCharacter] = useState(null);
  const [locationDetails, setLocationDetails] = useState({});
  const {episodeMap} = useContext(EpisodeContext);

  useEffect(() => {
    axiosInstance
      .get(`/character/${characterId}`)
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((error) => {
        console.error('Error fetching character:', error);
      });
  }, [characterId]);

  useEffect(() => {
    if (character) {
      axios
        .get(character.location.url)
        .then((res) => setLocationDetails(res.data))
        .catch((err) => console.log(err));
    }
  }, [character]);

  if (!character) {
    return <div>Loading...</div>;
  }

  //set character location details

  return (
    <div className={styles.characterProfile}>
      <img
        src={character.image}
        alt={character.name}
        className={styles.characterImage}
      />
      <h2>{character.name}</h2>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Status: {character.status}</p>
      <div className={styles.section}>
        <h3>Origin:</h3>
        <p>{character.origin.name}</p>
      </div>

      <div className={styles.section}>
        <h3>Current Location:</h3>
        <p>{locationDetails.name}</p>
        <p>Dimension: {locationDetails.dimension}</p>
        <p>Type: {locationDetails.type}</p>
        <p>Amount of Residents: {locationDetails.residents?.length}</p>
      </div>

      <div className={styles.section}>
        <h3>Episodes:</h3>
        <ul>
          {character.episode.map((episode) => (
            <li key={episode}>{episodeMap.get(episode)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterProfile;
