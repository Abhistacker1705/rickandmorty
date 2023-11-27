import './App.css';

import {Routes, Route} from 'react-router-dom';

import CharactersPage from './pages/CharactersPage';
import CharacterProfilePage from './pages/CharacterProfilePage';
import LocationsPage from './pages/LocationsPage';
import EpisodesPage from './pages/EpisodesPage';
import LocationResidents from './pages/LocationResidents';
import EpisodeCharacters from './pages/EpisodeCharacters';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CharactersPage />} />
      <Route path="/characters" element={<CharactersPage />} />
      <Route
        path="/characters/:characterId"
        element={<CharacterProfilePage />}
      />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/locations/:locationId" element={<LocationResidents />} />
      <Route path="/episodes" element={<EpisodesPage />} />
      <Route path="/episodes/:episodeId" element={<EpisodeCharacters />} />
    </Routes>
  );
}

export default App;
