import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import '../../App.css';
// import { url, apiOptions } from '../../api';

const Search = ({ newSearchCity }) => {
  // 4 Step the function which is pass from parent component ({ newSearchCity })
  const [search, setSearch] = useState(null); // 1 Step we create a variable for searching and we use in <AsyncPaginate value={search} />

  const loadCityOptions = async (inputValue) => {
    const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3c245e0f4amshbc09a29695adbbcp1e173djsnca6f60059cde',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(
        `${url}/cities?minPopulation=100000&namePrefix=${inputValue}`,
        options
      );
      const data = await response.json();

      const cities = data.data || [];
      const optionsArray = cities.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name} ${city.countryCode}`,
      }));

      return { options: optionsArray };
    } catch (error) {
      console.error(error);
      return { options: [] };
    }
  };

  // 3 Step we create a function where we use in <AsyncPaginate /> component

  const updateNewChanges = (searchCity) => {
    setSearch(searchCity);
    newSearchCity(searchCity); // Step 5 we pas here the ({ newSearchCity })
  };

  return (
    <AsyncPaginate
      placeholder="Enter your city......"
      debounceTimeout={600}
      value={search}
      onChange={updateNewChanges} // 2 Step Uppdate the value from searching
      loadOptions={loadCityOptions} //6 Step Method for loading property from the input tru async request
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: '30rem',
          borderWidth: '3px',
          borderColor: state.isFocused ? 'grey' : 'lemonchiffon',
          backgroundColor: 'dangerLight',
          borderRadius: '2rem',
          // Full width for screens up to 375px
          '@media (max-width: 375px)': {
            width: '340px',
            height: '30px',
            fontSize: '18px',
          },
        }),
        input: (provided) => ({
          ...provided,
          color: '#fff', // Example text color
          fontSize: '16px', // Example font size
          // Add any other input text styles here
        }),
        placeholder: (provided) => ({
          ...provided,
          color: 'wiite', // Change this to the desired color
        }),
        option: (provided, state) => ({
          ...provided,
          color: 'white', // Change this to the option text color
          backgroundColor: state.isSelected ? 'yellow' : 'palegoldenrod', // Change this to the option background color
          // Adjust the padding as needed to ensure full height
          padding: '1rem',
          margin: '0', // Reset margin to ensure consistent spacing
          marginTop: '-10px',
          marginBottom: '-10px',
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '9rem', // Change this to the desired border radius for the options' container
        }),
      }}
    />
  );
};

export default Search;
