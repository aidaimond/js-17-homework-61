import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {CountryInfo} from "../../types";

interface Props {
  alphaCode: string | null;
}

const CountriesInfo: React.FC<Props> = ({alphaCode}) => {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  // const [borders, setBorders] = useState<string | undefined>();

  const fetchCountryInfo = useCallback(async (alphaCode: string) => {
    const countryResponse = await axios.get('v2/alpha/' + alphaCode);
    setCountryInfo(countryResponse.data);
  }, []);


  useEffect(() => {
    if (alphaCode !== null) {
      fetchCountryInfo(alphaCode).catch(console.error);
    }
  }, [alphaCode, fetchCountryInfo]);

  console.log(countryInfo?.borders);

  return countryInfo ? (
    <div className="col m-4 border p-4 rounded border-2 bg-primary bg-opacity-10">
      <div className="bg-white text-center border border-2 rounded p-4">
        <h4>Country: {countryInfo.name}</h4>
        <p>Capital: {countryInfo.capital}</p>
        <p>Population: {countryInfo.population}</p>
        <img
          src={countryInfo.flag} style={{width: '236px', height: '158px'}}
          className="border"
          alt="flag"
        />
      </div>
    </div>
  ) : (
    <div className="col m-4 border p-4 rounded border-2 bg-primary bg-opacity-10">
      <div className="bg-white text-center border border-2 rounded p-4">
        <p>Please Choose Country!</p>
      </div>
    </div>
  );

};

export default CountriesInfo;