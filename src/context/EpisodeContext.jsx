import {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const EpisodeContext = createContext();

const EpisodeProvider = ({children}) => {
  const [episodes, setEpisodes] = useState([]);
  const [episodeUrl, setEpisodeUrl] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    'https://rickandmortyapi.com/api/episode'
  );
  const [done, setDone] = useState(false);

  const episodeMap = new Map();

  const getAllEpisodes = () => {
    axios.get(currentPage).then((res) => {
      setEpisodes([...episodes, ...res.data.results]);
      setCurrentPage(res.data.info.next);
    });
  };

  //get every episode in an array
  useEffect(() => {
    if (currentPage) {
      getAllEpisodes();
      return;
    }
    setDone(true);
  }, [currentPage]);

  // after getting set url as key and name as value for episode object array

  useEffect(() => {
    episodes.map((episode) => {
      const episodeUrlObj = {[episode.url]: episode.name};
      setEpisodeUrl((prev) => [...prev, episodeUrlObj]);
    });
  }, [done]);

  //setting Map so that it can be used to show episodes
  if (episodeUrl.length) {
    episodeUrl.map((value) =>
      episodeMap.set(Object.keys(value)[0], value[Object.keys(value)[0]])
    );
  }

  return (
    <EpisodeContext.Provider value={{episodeMap, episodes}}>
      {children}
    </EpisodeContext.Provider>
  );
};

export default EpisodeProvider;
