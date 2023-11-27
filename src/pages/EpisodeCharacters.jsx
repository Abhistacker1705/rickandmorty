import React, {useEffect, useState} from 'react';
import CharacterGrid from '../components/CharacterGrid/CharacterGrid';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

const EpisodeCharacters = () => {
  let {episodeId} = useParams();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchEpisodeCharacters = async () => {
      try {
        const response = await axios.post(
          'https://rickandmortyapi.com/graphql',
          {
            query: `
            query {
              episode(id: ${episodeId}) {
                characters {
                  id
                  name
                  status
                  species
                  type
                  gender
                  image
                }
              }
            }
          `,
          }
        );

        setCharacters(response.data.data.episode.characters);
      } catch (error) {
        console.error('Error fetching episode characters:', error);
      }
    };

    fetchEpisodeCharacters();
  }, [episodeId]);

  return (
    <AppLayout>
      <CharacterGrid characters={characters} />
    </AppLayout>
  );
};

export default EpisodeCharacters;
