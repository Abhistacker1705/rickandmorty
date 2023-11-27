import React, {useState, useEffect} from 'react';
import {axiosInstance} from '../services/datafetch';
import LocationGrid from '../components/LocationGrid/LocationGrid';
import Pagination from '../components/Pagination/Pagination';

import {useNavigate} from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

const LocationsPage = () => {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [locationsPerPage] = useState(20);
  const [totalResultLength, setTotalResultLength] = useState(0);

  //effect when query changes as when query changes,call to API should be with page number 1

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchLocations(query, 1);
    }, 600);

    return () => clearTimeout(timer);
  }, [query]);

  //effect when page number as  after page changes it should navigate to top
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollTo({top, behavior: 'smooth'});
      fetchLocations(query, currentPage);
    }, 600);

    return () => clearTimeout(timer);
  }, [currentPage]);

  //fetch location function
  const fetchLocations = async (query, page) => {
    try {
      const response = await axiosInstance.get(
        `/location/?page=${page}&name=${query}`
      );
      setLocations(response.data.results);
      setTotalResultLength(response.data.info.count);
    } catch (error) {
      setLocations([]);
      console.error('Error fetching locations:', error);
    }
  };

  // set query
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleLocationClick = async (locationId) => {
    navigate(`${locationId}`);
  };

  return (
    <AppLayout>
      <div>
        <h2>Rick & Morty Locations</h2>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search locations by name"
          value={query}
          onChange={handleSearch}
        />
      </div>
      <LocationGrid
        locations={locations}
        handleLocationClick={handleLocationClick}
      />

      {locations.length && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          charactersPerPage={locationsPerPage}
          totalResultLength={totalResultLength}
        />
      )}
    </AppLayout>
  );
};

export default LocationsPage;
