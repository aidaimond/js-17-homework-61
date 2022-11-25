import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {Country} from "../../types";
import CountryItems from "./CountryItems";
import CountriesInfo from "../CountriesInfo/CountriesInfo";

const CountriesList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const fetchCountry= useCallback(async () => {
    const countriesResponse = await axios.get('v2/all?fields=alpha3Code,name');
    setCountries(countriesResponse.data);
  }, []);

  useEffect(() => {
    fetchCountry().catch(console.error);
  }, [fetchCountry]);

  return (
    <div className="d-flex justify-content-between">
      <div className="col m-4 border p-4 rounded border-2 bg-primary bg-opacity-10">
        <ul className="list-group">
          {countries.map((country) => (
            <CountryItems
              key={country.name}
              name={country.name}
              onClick={() => setSelectedCountry(country.alpha3Code)}
            />
          ))}
        </ul>
      </div>
      <CountriesInfo alphaCode={selectedCountry}/>
    </div>
  );
};

export default CountriesList;