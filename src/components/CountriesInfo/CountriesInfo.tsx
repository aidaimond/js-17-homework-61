import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {CountryInfo} from "../../types";

interface Props {
  alphaCode: string | null;
}

const CountriesInfo: React.FC<Props> = ({alphaCode}) => {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [borders, setBorders] = useState<string[]>([]);

  const fetchCountryInfo = useCallback(async (alphaCode: string) => {
    let newBorders: string[] = ['No borders'];
    const countryResponse = await axios.get<CountryInfo>('v2/alpha/' + alphaCode);
    setCountryInfo(countryResponse.data);
    if (countryResponse.data.borders) {
      const promises = (countryResponse.data.borders).map(async (border: string) => {
        const borderResponse = await axios.get<CountryInfo>('v2/alpha/' + border);
        return borderResponse.data.name;
      });
      newBorders = await Promise.all(promises);
    }
    setBorders(newBorders);
  }, []);

  useEffect(() => {
    if (alphaCode !== null) {
      fetchCountryInfo(alphaCode).catch(console.error);
    }
  }, [alphaCode, fetchCountryInfo]);

  return countryInfo ? (
    <div className="col m-4 border p-4 rounded border-2 bg-primary bg-opacity-10">
      <div className="bg-white text-center border border-2 rounded p-4">
        <h4>Country: {countryInfo.name}</h4>
        <p>Capital: {countryInfo.capital}</p>
        <p>Population: {countryInfo.population}</p>
        <img
          src={countryInfo.flag} style={{width: '236px', height: '158px'}}
          className="border m-3"
          alt="flag"
        />
        <ul className="list-group list-group-flush mt-5">Borders:
          {borders.map(border => (
            <li className="list-group-item" key={Math.random()}>{border}</li>
          ))}
        </ul>
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