import {useState} from "react";
import {AsyncPaginate} from 'react-select-async-paginate';
import {urlGeo, geoApiOptions} from "../../Api.js";

function Search({onSearchChange}) {
  const[search, setSearch] = useState("");

  const loadOptions = async (inputValue) =>{
    try {
      const response = await fetch(`${urlGeo}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);
      const result = await response.json();
      return {
        options: result.data.map((city)=>{
          return{
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          }
        })
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleOnChange = (searchData)=>{
    setSearch(searchData);
    onSearchChange(searchData);
  }

  return (
    <AsyncPaginate
        placeholder="Search for a city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
    />
  )
}

export default Search