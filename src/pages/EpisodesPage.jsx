import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import {EpisodeContext} from '../context/EpisodeContext';
import EpisodeGrid from '../components/EpisodeGrid/EpisodeGrid';

const EpisodesPage = () => {
  const navigate = useNavigate();

  const {episodes} = useContext(EpisodeContext);

  const [filteredEpisodes, setFilteredEpisodes] = useState([...episodes]);
  const [query, setQuery] = useState('');

  //setting query
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  //effect when query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = episodes.filter((episode) =>
        episode.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEpisodes(filtered);
    }, 600);

    return () => clearTimeout(timer);
  }, [query]);

  const handleEpisodeClick = async (episodeId) => {
    navigate(`${episodeId}`);
  };

  return (
    <AppLayout>
      <div>
        <h2>Rick & Morty Episodes</h2>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search episodes by name"
          value={query}
          onChange={handleSearch}
        />
      </div>
      <EpisodeGrid
        episodes={filteredEpisodes}
        handleEpisodeClick={handleEpisodeClick}
      />
    </AppLayout>
  );
};

export default EpisodesPage;
