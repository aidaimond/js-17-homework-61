import React, {useCallback, useEffect, useState} from 'react';
import CountryInput from "./CountryOption/CountryOption";
import axios from "axios";
import {Country} from "../../types";

const LeftSide = () => {
  const [countries, setCountries] = useState([]);
  const fetchCountry= useCallback(async () => {
    const countriesResponse = await axios.get('v2/all?fields=alpha3Code,name');
    setCountries(countriesResponse.data);
  }, []);

  useEffect(() => {
    fetchCountry().catch(console.error);
  }, [fetchCountry]);


  console.log(countries);
  return (
    <div>
      <select>
        {countries.map((country: Country) => (
          <CountryInput
            key={country.name}
            name={country.name}
          />
        ))}
      </select>
    </div>
  );
};

export default LeftSide;