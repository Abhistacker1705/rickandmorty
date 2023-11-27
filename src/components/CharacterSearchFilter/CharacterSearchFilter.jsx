import {useState, useEffect} from 'react';
import styles from './CharacterSearchFilter.module.css';
import {axiosInstance} from '../../services/datafetch';

const CharacterSearchFilter = ({
  setCharacters,
  currentPage,
  setCurrentPage,
  setTotalResultLength,
}) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    location: '',
    episode: '',
    gender: '',
    species: '',
    type: '',
  });

  //fetch characters function
  const fetchCharacters = () => {
    axiosInstance
      .get(
        `/character/?page=${currentPage}&name=${query}&status=${filters.status}&species=${filters.species}&gender=${filters.gender}&type=${filters.type}`
      )
      .then((res) => {
        setTotalResultLength(res.data.info.count);
        setCharacters(res.data.results);
      })
      .catch((err) => setCharacters([]));
  };

  //debounce function for search and filters
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCharacters();
    }, 600);

    return () => clearTimeout(timer);
  }, [query, filters, currentPage]);

  //if filters or search query changed then page number is set to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [query, filters]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const {name, value} = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name"
        value={query}
        onChange={handleInputChange}
        className={styles.input}
      />
      {/* Filters */}
      <select
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
        className={styles.select}>
        {/* Status Options*/}
        <option value="">Select Status</option>

        {statusOptions}
      </select>
      <select
        name="gender"
        value={filters.gender}
        onChange={handleFilterChange}
        className={styles.select}>
        {/* Gender Options*/}
        <option value="">Select Gender</option>
        {genderOptions}
      </select>
      <select
        name="species"
        value={filters.species}
        onChange={handleFilterChange}
        className={styles.select}>
        {/* Species Options*/}
        <option value="">Select Species</option>
        {speciesOptions}
      </select>
    </div>
  );
};

const statusOptions = ['Alive', 'Dead', 'Unknown'].map((status) => (
  <option key={status} value={status}>
    {status}
  </option>
));

const genderOptions = ['Male', 'Female', 'Genderless', 'Unknown'].map(
  (gender) => (
    <option key={gender} value={gender}>
      {gender}
    </option>
  )
);

const speciesOptions = [
  'Human',
  'Alien',
  'Mythological Creature',
  'Unknown',
].map((species) => (
  <option key={species} value={species}>
    {species}
  </option>
));

export default CharacterSearchFilter;
