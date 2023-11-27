import React, {useEffect, useState} from 'react';
import CharacterGrid from '../components/CharacterGrid/CharacterGrid';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

const LocationResidents = () => {
  //location id from params
  let {locationId} = useParams();
  const [residents, setResidents] = useState([]);

  //effect to get residents in a location and their details
  useEffect(() => {
    const response = axios.post('https://rickandmortyapi.com/graphql', {
      query: `  query {
            location(id: ${locationId}) {
                residents {
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
    });

    response.then(({data}) => setResidents(data.data.location.residents));
  }, [locationId]);

  return (
    <AppLayout>
      <CharacterGrid characters={residents} />
    </AppLayout>
  );
};

export default LocationResidents;
