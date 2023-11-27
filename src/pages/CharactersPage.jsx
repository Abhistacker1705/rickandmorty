import {useEffect, useState} from 'react';

import CharacterGrid from '../components/CharacterGrid/CharacterGrid';
import CharacterSearchFilter from '../components/CharacterSearchFilter/CharacterSearchFilter';
import Pagination from '../components/Pagination/Pagination';

import {useNavigate, useLocation} from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(20);
  const [totalResultLength, setTotalResultLength] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == '/') navigate('/characters');
  });

  useEffect(() => {
    window.scroll({top: 0, behavior: 'smooth'});
  }, [currentPage]);

  return (
    <AppLayout>
      <div>
        <h2>Rick & Morty Characters</h2>
      </div>
      <CharacterSearchFilter
        setCharacters={setCharacters}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setTotalResultLength={setTotalResultLength}
      />
      <CharacterGrid characters={characters} />

      {characters.length && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          charactersPerPage={charactersPerPage}
          totalResultLength={totalResultLength}
        />
      )}
    </AppLayout>
  );
};

export default CharactersPage;
